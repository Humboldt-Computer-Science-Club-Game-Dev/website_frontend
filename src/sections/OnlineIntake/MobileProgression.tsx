import onlineIntakeContext from "./OnlineIntakeContext";
import { useContext, Fragment } from "react";
import { progression } from "./utilities";

function MobileProgression() {
  const {
    stepData,
    stepOrder,
    stepPressFromProgressMenu,
    stepSubStepIndexMap,
  } = useContext(onlineIntakeContext);

  return (
    <>
      <section className="title_container">
        <h1>Your Progress</h1>
        <img src="icons/info.svg" alt="more info" className="info_button" />
      </section>
      <div className="mobile_progression_container">
        {stepOrder?.map ? (
          stepOrder.map((step: any, i: number) => {
            const key = i + 3000;
            const innerKey = i * 2 + 4000;
            if (i === 0) return <Fragment key={key}></Fragment>; // Don't want to show the start step
            return (
              <StepProgress
                step={stepData[step]}
                stepPressFromProgressMenu={stepPressFromProgressMenu}
                key={key}
                innerKey={innerKey}
                stepSubStepIndexMap={stepSubStepIndexMap}
              />
            );
          })
        ) : (
          <>stepOrder is not found</>
        )}
      </div>
    </>
  );
}

function StepProgress({
  step,
  stepPressFromProgressMenu,
  innerKey,
  stepSubStepIndexMap,
}: any) {
  console.log(
    "The step:",
    step,
    " The stepSubStepIndexMap:",
    stepSubStepIndexMap
  );

  let progress = 0;

  let stepCurrentStepIndex = stepSubStepIndexMap
    ? stepSubStepIndexMap[step?.step]?.high
    : null;
  const stepMaxStepIndex = stepSubStepIndexMap
    ? stepSubStepIndexMap[step?.step]?.max
    : null;

  if (stepCurrentStepIndex && stepMaxStepIndex) {
    if (stepCurrentStepIndex !== 0) stepCurrentStepIndex += 1;
    progress = stepCurrentStepIndex / stepMaxStepIndex;
  }

  const progressState: "complete" | "notStarted" | "inProgress" =
    progress === 1
      ? "complete"
      : progress === 0 &&
        stepSubStepIndexMap &&
        !stepSubStepIndexMap[step?.step]?.started
      ? "notStarted"
      : "inProgress";

  const progressMap: { complete: any; notStarted: any; inProgress: any } = {
    complete: {
      message: "Complete",
      color: "#50CE66",
      icon: "icons/green_check.svg",
    },
    notStarted: {
      message: "Not started",
      color: "#6e7987",
    },
    inProgress: {
      message: "In progress",
      color: "#FF696A",
      icon: "icons/red_incomplete.svg",
    },
  };

  if (
    stepSubStepIndexMap &&
    stepSubStepIndexMap[step?.step]?.started &&
    progress === 0
  )
    progress = 0.05;

  console.log(
    stepSubStepIndexMap,
    stepSubStepIndexMap[step?.step]?.started,
    progress
  );

  //Make it so that progress is truncated to 2 decimal places
  const progressionTruncated = Math.trunc(progress * 100) / 100;

  return (
    <Fragment key={innerKey}>
      <section className="progress_container">
        <section
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: progression.getProgressColor(progressionTruncated),
            borderTopRightRadius: "12px",
          }}
        ></section>
      </section>
      <section
        className="step_container"
        onClick={() => {
          stepPressFromProgressMenu(step?.step);
        }}
      >
        <div className="text_progress">
          {progressMap[progressState]?.icon ? (
            <img
              src={progressMap[progressState]?.icon || null}
              alt="progress"
            />
          ) : (
            <></>
          )}
          <label
            style={{
              color: progressMap[progressState]?.color || "#FF696A",
            }}
          >
            {progressMap[progressState]?.message || "in progress"}
          </label>
        </div>
        <h2>{step.title}</h2>
      </section>
    </Fragment>
  );
}

export default MobileProgression;
