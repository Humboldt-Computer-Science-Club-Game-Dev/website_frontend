import { useState, useEffect } from "react";
import { useIsMobile } from "utilities";

const stepOrderFemale: Step[] = [
  "start",
  "applicantInfo",
  "preventionAndAfterCareNeedsAssessment",
  "protectiveFactorsSurvey",
  "nurturingSkills",
  "receiveDocuments",
  "scheduleIntake",
  "confirmation",
];

const stepOrderMale: Step[] = [
  "start",
  "applicantInfo",
  "preventionAndAfterCareNeedsAssessment",
  "protectiveFactorsSurvey",
  "receiveDocuments",
  "scheduleIntake",
  "confirmation",
];

export const stepData: { [key in Step]: any } = {
  start: { title: "Start", step: "start" },
  applicantInfo: {
    title: "Applicant Information",
    step: "applicantInfo",
  },
  preventionAndAfterCareNeedsAssessment: {
    title: "Prevention and After Care Needs Assessment",
    step: "preventionAndAfterCareNeedsAssessment",
  },
  protectiveFactorsSurvey: {
    title: "Protective Factors Survey",
    step: "protectiveFactorsSurvey",
  },
  nurturingSkills: {
    title: "Nurturing Skills for Families",
    step: "nurturingSkills",
  },
  receiveDocuments: {
    title: "Receive Documents",
    step: "receiveDocuments",
  },
  scheduleIntake: {
    title: "Schedule Intake",
    step: "scheduleIntake",
    requiredSteps: [
      "applicantInfo",
      "preventionAndAfterCareNeedsAssessment",
      "protectiveFactorsSurvey",
    ],
  },
  confirmation: {
    title: "Confirmation",
    step: "confirmation",
    requiredSteps: ["scheduleIntake"],
  },
};

function useSteps() {
  const isMobile = useIsMobile();
  const [stepIndex, setStepIndex] = useState(/* isMobile */true ? 0 : 1);
  const [stepOrder, setStepOrder] = useState<Step[]>(stepOrderFemale);
  const [step, setStep] = useState<Step>(stepOrder[stepIndex]);
  const [subStepIndex, setSubStepIndex] = useState(0);
  const [stepSubStepIndexMap, setStepSubStepIndexMap] = useState<{
    [key in Step]: {
      current: number;
      max: number;
      high: number;
      started: boolean;
    };
  }>({
    start: { current: 0, max: 1, high: 0, started: false },
    applicantInfo: { current: 0, max: 1, high: 0, started: false },
    preventionAndAfterCareNeedsAssessment: {
      current: 0,
      max: 1,
      high: 0,
      started: false,
    },
    protectiveFactorsSurvey: { current: 0, max: 1, high: 0, started: false },
    nurturingSkills: { current: 0, max: 1, high: 0, started: false },
    receiveDocuments: { current: 0, max: 1, high: 0, started: false },
    scheduleIntake: { current: 0, max: 1, high: 0, started: false },
    confirmation: { current: 0, max: 1, high: 0, started: false },
  });
  const [subMax, setSubMax] = useState(1);
  const [showMobileProgress, setShowMobileProgress] = useState(false);

  useEffect(() => {
    setStep(stepOrder[stepIndex]);
  }, [stepIndex]);

  useEffect(() => {
    const newStepSubStepIndexMap = JSON.parse(
      JSON.stringify(stepSubStepIndexMap)
    );
    if (subStepIndex >= newStepSubStepIndexMap[step].high)
      newStepSubStepIndexMap[step].high = subStepIndex;
    newStepSubStepIndexMap[step].current = subStepIndex;
    newStepSubStepIndexMap[step].started = true;
    setStepSubStepIndexMap(newStepSubStepIndexMap);
  }, [subStepIndex]);

  useEffect(() => {
    const newStepSubStepIndexMap = JSON.parse(
      JSON.stringify(stepSubStepIndexMap)
    );
    newStepSubStepIndexMap[step].max = subMax;
    setStepSubStepIndexMap(newStepSubStepIndexMap);
  }, [subMax]);

  useEffect(() => {
    const newStepSubStepIndexMap = JSON.parse(
      JSON.stringify(stepSubStepIndexMap)
    );

    if (newStepSubStepIndexMap[step])
      newStepSubStepIndexMap[step].started = true;
    setStepSubStepIndexMap(newStepSubStepIndexMap);
    setSubStepIndex(newStepSubStepIndexMap[step]?.current || 0);
    setSubMax(newStepSubStepIndexMap[step]?.max || 1);
  }, [step]);

  return {
    stepIndex,
    setStepIndex,
    step,
    setStep,
    subStepIndex,
    setSubStepIndex,
    subMax,
    setSubMax,
    showMobileProgress,
    setShowMobileProgress,
    stepSubStepIndexMap,
    stepData,
    stepOrder,
    setStepsType,
    canAccessStep,
  };

  function setStepsType(type: "male" | "female") {
    const newStepOrder = type === "male" ? stepOrderMale : stepOrderFemale;
    console.log("newStepOrder:", newStepOrder);
    setStepOrder(newStepOrder);
  }

  function canAccessStep(step: Step): boolean {
    const requiredSteps = stepData[step].requiredSteps;
    if (!requiredSteps) return true;
    return requiredSteps.every((requiredStep: Step) => {
      const { high, max, started }: any = stepSubStepIndexMap[requiredStep];
      console.log("requiredStep:", requiredStep, high, max, started);
      if (max === 1 && started) return true;
      else return high + 1 === max;
    });
  }
}

export default useSteps;

export type Step =
  | "start"
  | "applicantInfo"
  | "preventionAndAfterCareNeedsAssessment"
  | "protectiveFactorsSurvey"
  | "nurturingSkills"
  | "receiveDocuments"
  | "scheduleIntake"
  | "confirmation";
