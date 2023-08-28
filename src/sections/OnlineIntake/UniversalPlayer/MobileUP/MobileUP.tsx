import { useState, useEffect, useContext } from "react";
import SubStep from "./SubStep";
import {
  buildSubSteps,
  typeToClassName,
  collateLoadedSubSteps,
} from "./localHelpers";
import onlineIntakeContext from "sections/OnlineIntake/OnlineIntakeContext";

function MobileUP({ initialLoadedComponents }: any) {
  const { loadedComponents, subStepIndex, setSubMax } =
    useContext(onlineIntakeContext);

  const [subSteps, setSubSteps] = useState(
    buildSubSteps(initialLoadedComponents)
  );
  const currentSubStep = subSteps[subStepIndex];

  const containerClassName = typeToClassName(currentSubStep?.type);
  const [initializedLoadedComps, setInitializedLoadedComps] =
    useState<Boolean>(false);

  const [loadedSubSteps, setLoadedSubSteps] = useState(
    buildSubSteps(initialLoadedComponents)
  );

  useEffect(() => {
    setSubSteps(buildSubSteps(initialLoadedComponents));
    setLoadedSubSteps(buildSubSteps(initialLoadedComponents));
  }, [initialLoadedComponents]);

  useEffect(() => {
    if (!setSubMax) return;
    setSubMax(subSteps.length);
  }, [subSteps]);

  useEffect(() => {
    if (initializedLoadedComps) return;
    loadedComponents.current = initialLoadedComponents;
    if (initializedLoadedComps) setInitializedLoadedComps(true);
  }, [initialLoadedComponents]);

  useEffect(() => {
    loadedComponents.current = collateLoadedSubSteps(loadedSubSteps);
  }, [loadedSubSteps]);

  return (
    <div className={`mobile_up_container ${containerClassName}`}>
      <SubStep
        subStep={currentSubStep}
        loadedSubStep={loadedSubSteps[subStepIndex]}
        updateWithLoadedSubStep={updateWithLoadedSubStep}
        key={currentSubStep?.ID}
      />
    </div>
  );

  function updateWithLoadedSubStep(loadedSubStep: any) {
    // Check if loadedSubStep is already in loadedSubSteps
    // If so, replace it
    let loadedSubStepsCopy = JSON.parse(JSON.stringify(loadedSubSteps));
    let foundFlag = false;
    loadedSubStepsCopy = loadedSubStepsCopy.map(
      (iteratedLoadedSubStep: any, i: number) => {
        switch (iteratedLoadedSubStep.type) {
          case "selection":
            const question = iteratedLoadedSubStep?.questions
              ? iteratedLoadedSubStep?.questions[0]
              : null;

            const loadedSubStepQuestion = loadedSubStep.questions[0];

            if (!question || !loadedSubStepQuestion) {
              /* TODO: Handle this error */
            }

            if (loadedSubStepQuestion.id === question.id) {
              foundFlag = true;
              return loadedSubStep;
            }
            return iteratedLoadedSubStep;
          default:
            if (iteratedLoadedSubStep.ID === loadedSubStep.ID) {
              foundFlag = true;

              return loadedSubStep;
            }
            return iteratedLoadedSubStep;
        }
      }
    );

    // If not, add it
    if (!foundFlag) loadedSubStepsCopy.push(loadedSubStep);

    setLoadedSubSteps(loadedSubStepsCopy);
  }
}

export default MobileUP;
