import { createContext, useState, useEffect, useRef } from "react";
import SchemaSaves from "./SchemaSaves";
import { SimpleFlash, showSimpleFlash } from "components/Flash";
import useSteps, { Step } from "./useSteps";
import { authRouteStore } from "api/auth/userStore";

const onlineIntakeContext = createContext<any>({});

export default onlineIntakeContext;

export const OnlineIntakeContextProvider = ({ children }: any) => {
  const sMan = useSteps();

  const [showMobileProgress, setShowMobileProgress] = useState(false);
  const [chunks, setChunks] = useState<any>([]);

  const [calendly, setCalendly] = useState<any>({
    calendlyRouteID: null,
    fixedCalendyHeightDesktop: null,
    fixedCalendyHeightMobile: null,
  });

  // Have ticket id equal a random 10 digit number
  const [ticketID] = useState<any>(Math.floor(Math.random() * 10000000000));

  const loadedComponents = useRef<any>([]);

  let authRoute = authRouteStore.getState();

  useEffect(() => {
    console.log("chunks:", chunks);
  }, [chunks]);

  return (
    <onlineIntakeContext.Provider
      value={{
        stepData: sMan.stepData,
        step: sMan.step,
        setStep: safeSetStep,
        stepOrder: sMan.stepOrder,
        next,
        subStepIndex: sMan.subStepIndex,
        subNext,
        subBack,
        subMax: sMan.subMax,
        setSubMax: sMan.setSubMax,
        showMobileProgress,
        setShowMobileProgress,
        showProgressMenu,
        stepPressFromProgressMenu,
        chunks,
        updateSchemaSaves,
        loadedComponents,
        stepSubStepIndexMap: sMan.stepSubStepIndexMap,
        calendly,
        setCalendly,
        ticketID,
      }}
    >
      {/* //@ts-ignore */}
      <SimpleFlash
        className="flash_online_intakes d-none"
        title="Invalid Inputs"
      ></SimpleFlash>

      {children}
    </onlineIntakeContext.Provider>
  );

  function safeSetStep(step: Step) {
    const index = sMan.stepOrder.indexOf(step);
    if (index !== -1) sMan.setStepIndex(index);
  }

  function stepPressFromProgressMenu(step: Step) {
    if (!sMan.canAccessStep(step))
      return (() => {
        showSimpleFlash(
          "You have not complected the required steps to access this step"
        );
      })();
    setShowMobileProgress(false);
    safeSetStep(step);
  }

  function next({ isMobile }: { isMobile: boolean }) {
    const newIndex = sMan.stepIndex + 1;
    const nextStep = sMan.stepOrder[newIndex];
    if (!sMan.canAccessStep(nextStep))
      return (() => {
        showSimpleFlash(
          "You have not complected the required steps to access this step"
        );
      })();
    sMan.setStepIndex(newIndex);
    if (isMobile) return;
    asyncSave();
  }

  function subNext() {
    const newIndex = sMan.subStepIndex + 1;
    if (!validateSubStep()) return;
    manageStepOrder(loadedComponents.current);
    updateSchemaSaves(loadedComponents.current);
    asyncSave();
    if (!(newIndex >= sMan.subMax)) sMan.setSubStepIndex(newIndex);
    else next({ isMobile: true });
  }

  function subBack() {
    const newIndex = sMan.subStepIndex - 1;
    const previousStep = sMan.stepOrder[newIndex];
    if (!validateSubStep()) return;
    manageStepOrder(loadedComponents.current);
    updateSchemaSaves(loadedComponents.current);
    asyncSave();
    if (!(newIndex < 0)) sMan.setSubStepIndex(newIndex);
  }

  function showProgressMenu() {
    if (!validateSubStep()) return;
    manageStepOrder(loadedComponents.current);
    updateSchemaSaves(loadedComponents.current);
    asyncSave();
    setShowMobileProgress(true);
  }

  function manageStepOrder(loadedComponents: any) {
    const loadedComponentsCopy = JSON.parse(JSON.stringify(loadedComponents));
    for (let i = 0; i < loadedComponentsCopy.length; i++) {
      const loadedChunk = loadedComponentsCopy[i];
      const { ID } = loadedChunk || {};
      if (ID !== "applicant_inputs") continue;
      const { questions } = loadedChunk || {};
      if (!questions) continue;
      for (let j = 0; j < questions.length; j++) {
        const question = questions[j];
        const { id } = question || {};
        if (id !== "gender") continue;
        const { answer } = question || {};
        if (!answer) continue;

        const gender = getGender(answer);

        sMan.setStepsType(gender === "other" ? "female" : gender);
      }
    }
  }

  function validateSubStep() {
    const loadedComponentsCopy = loadedComponents.current;
    const validationMessage = validateLoadedComponents(loadedComponentsCopy);
    if (validationMessage) {
      showSimpleFlash(validationMessage);
      return;
    }
    return true;
  }

  function updateSchemaSaves(loadedComponents: any) {
    const currentSchemaSaves = new SchemaSaves(chunks);

    const isArray =
      Object.prototype.toString.call(loadedComponents) == "[object Array]";

    if (isArray) {
      loadedComponents.forEach((loadedComponent: any) => {
        currentSchemaSaves.updateChunk(loadedComponent);
      });
    } else currentSchemaSaves.updateChunk(loadedComponents);

    const newChunks = [...currentSchemaSaves.getChunks()];

    // I have no idea why I have to use the spread operator here in order to get the state to update
    setChunks([...newChunks]);
  }

  function asyncSave() {
    return new Promise((resolve, reject) => {
      fetch(`${authRoute}/onlineIntake/saveChunks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chunks,
          ticketID,
        }),
      })
        .then(async (res: any) => {
          if (!res.ok) return Promise.reject(await res.json());
          return res.json();
        })
        .then((res) => {
          return resolve(true);
        })
        .catch((err) => {
          console.error(err);
          return resolve(null);
        });
    });
  }
};

function validateLoadedComponents(loadedComponents: any) {
  const isArray =
    Object.prototype.toString.call(loadedComponents) == "[object Array]";
  let validationMessage = null;

  if (isArray) {
    for (let i = 0; i < loadedComponents.length; i++) {
      const loadedComponent = loadedComponents[i];
      validationMessage = validateLoadedComponent(loadedComponent);
      if (validationMessage) break;
    }
  } else {
  }

  return validationMessage;
}

//TODO: Rename loadedComponent to loadedSchemaChunk
function validateLoadedComponent(loadedComponent: any) {
  const type = loadedComponent.type;
  let validationMessage = null;
  switch (type) {
    case "input":
      loadedComponent.questions.forEach((question: any) => {
        const validation = question?.validation;
        if (
          !validation ||
          !validation.required ||
          (validation?.required && !validation?.regex)
        )
          return;
        const answer = question?.answer;
        if (!answer) return (validationMessage = validation.error);
        const pattern = new RegExp(validation?.regex);
        if (!pattern.test(answer))
          return (validationMessage = validation.error);
      });
      break;
    case "infinite_input":
      return null;
    case "selection":
      if (!loadedComponent?.questions) return null;
      loadedComponent.questions.forEach((question: any) => {
        const required = question?.required;
        const answer = question?.answer;
        if (required && !answer) return (validationMessage = question.error);
      });
      break;
    default:
      console.error(`Invalid type: ${type} of data:`, loadedComponent);
  }

  return validationMessage;
}

function getGender(input: any) {
  if (isFemale(input)) return "female";
  else if (isMale(input)) return "male";
  else return "other";
}

function isMale(input: any) {
  // Set up an array of male identifiers.
  var maleIdentifiers = [
    "male",
    "man",
    "boy",
    "guy",
    "gentleman",
    "dude",
    "bro",
    "chap",
  ];

  // Convert the input to lowercase for consistency.
  var lowerCaseInput = input.toLowerCase();

  // Check each identifier against the input.
  for (var i = 0; i < maleIdentifiers.length; i++) {
    if (lowerCaseInput.includes(maleIdentifiers[i])) {
      return true;
    }
  }

  // If no male identifiers were found, return false.
  return false;
}

function isFemale(input: any) {
  // Set up an array of female identifiers.
  var femaleIdentifiers = [
    "female",
    "woman",
    "girl",
    "gal",
    "lady",
    "dame",
    "sis",
    "miss",
  ];

  // Convert the input to lowercase for consistency.
  var lowerCaseInput = input.toLowerCase();

  // Check each identifier against the input.
  for (var i = 0; i < femaleIdentifiers.length; i++) {
    if (lowerCaseInput.includes(femaleIdentifiers[i])) {
      return true;
    }
  }

  // If no female identifiers were found, return false.
  return false;
}
