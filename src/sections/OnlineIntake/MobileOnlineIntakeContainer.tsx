import { useContext, useEffect, cloneElement, useState } from "react";
import onlineIntakeContext from "./OnlineIntakeContext";
import MobileProgression from "./MobileProgression";
import { progression } from "./utilities";

function MobileOnlineIntake({ BG, children }: any) {
  const onlineIntakeContextPop = useContext(onlineIntakeContext);
  const {
    step,
    stepData,
    subStepIndex,
    subNext,
    subBack,
    subMax,
    showProgressMenu,
    showMobileProgress,
  } = onlineIntakeContextPop;
  const onStartStep = step === "start";
  const currentSubStep = subStepIndex + 1;
  const progress = (currentSubStep / subMax) * 100;

  useEffect(() => {
    if (onStartStep) return;
    configureBackgroundScrolling();
    adjustHeight();
    return revertBackgroundScrolling;
  }, [step]);

  useEffect(() => {
    window.addEventListener("load", adjustHeight);
    window.addEventListener("resize", adjustHeight);
  }, []);

  // step will have a drastic effect between start and applicantInfo
  return (
    <div
      className={`online_intake_container online_intake_container_mobile ${
        onStartStep ? "start_step" : "non_start_step"
      }`}
    >
      {onStartStep ? (
        <Background />
      ) : (
        <>
          <Background />
        </>
      )}
      <section className="front_container">
        {showMobileProgress ? (
          <MobileProgression />
        ) : (
          <>
            <StepContext />
            {children}
            <LowerNavButtons />
          </>
        )}
      </section>
    </div>
  );

  function LowerNavButtons() {
    const atFirstSubStep = subStepIndex === 0;

    if (onStartStep) return <></>;
    return (
      <div className="lower_mobile_nav_buttons">
        {!atFirstSubStep ? <button onClick={subBack}>Back</button> : <></>}
        <button
          onClick={subNext}
          style={
            atFirstSubStep ? { marginLeft: "auto", marginRight: "auto" } : {}
          }
        >
          Next
        </button>
      </div>
    );
  }

  function StepContext() {
    return onStartStep ? (
      <></>
    ) : (
      <>
        <div className="upper_context_row">
          <img
            className="back_button"
            onClick={() => {
              showProgressMenu();
            }}
            alt="back button"
            src="icons/back.svg"
          />
          <label className="step_title">{stepData[step]?.title}</label>
          <img
            className="info_button"
            onClick={() => {}}
            src="icons/info.svg"
            alt="info"
          />
        </div>
        <section className="lower_context_row">
          <span
            className="progress_made"
            style={{
              width: `${progress - 5 >= 2 ? progress - 5 : 2}%`,
              backgroundColor: `${progression.getProgressColor(
                progress / 100
              )}`,
            }}
          ></span>
        </section>
      </>
    );
  }

  function Background() {
    return (
      <img
        className="online_intake_startlike_background"
        src={BG}
        alt="background"
      />
    );
  }
}

export default MobileOnlineIntake;

function configureBackgroundScrolling() {
  const HTMLRootEle = document.querySelector("html") as HTMLElement;
  const rootEle = document.querySelector(`#root`) as HTMLElement;
  const bodyEle = document.querySelector(`body`) as HTMLElement;
  HTMLRootEle.style.overflowY = "hidden";
  rootEle.style.overflowY = "hidden";
  bodyEle.style.overflowY = "hidden";

  HTMLRootEle.style.height = "1vh";
  rootEle.style.height = "1vh";
  bodyEle.style.height = "1vh";

  HTMLRootEle.style.position = "relative";
  rootEle.style.position = "relative";
  bodyEle.style.position = "relative";

  HTMLRootEle.addEventListener("scroll", preventMotion, false);
  HTMLRootEle.addEventListener("touchmove", preventMotion, false);

  rootEle.addEventListener("scroll", preventMotion, false);
  rootEle.addEventListener("touchmove", preventMotion, false);

  bodyEle.addEventListener("scroll", preventMotion, false);
  bodyEle.addEventListener("touchmove", preventMotion, false);
}

function preventMotion(event: any) {
  /* window.scrollTo(0, 0); */
  /* event.preventDefault();
  event.stopPropagation(); */
}

function revertBackgroundScrolling() {
  const HTMLRootEle = document.querySelector("html") as HTMLElement;
  const rootEle = document.querySelector(`#root`) as HTMLElement;
  const bodyEle = document.querySelector(`body`) as HTMLElement;
  HTMLRootEle.style.overflowY = "auto";
  rootEle.style.overflowY = "auto";
  bodyEle.style.overflowY = "auto";

  // If this cause issues, find out the default position is and set it to that
  HTMLRootEle.style.position = "static";
  rootEle.style.position = "static";
  bodyEle.style.position = "static";

  HTMLRootEle.removeEventListener("scroll", preventMotion, false);
  HTMLRootEle.removeEventListener("touchmove", preventMotion, false);

  rootEle.removeEventListener("scroll", preventMotion, false);
  rootEle.removeEventListener("touchmove", preventMotion, false);

  bodyEle.removeEventListener("scroll", preventMotion, false);
  bodyEle.removeEventListener("touchmove", preventMotion, false);
}

function adjustHeight() {
  const mobile_online_intake_container_non_start_ele = document.querySelector(
    ".online_intake_container.online_intake_container_mobile.non_start_step"
  ) as HTMLElement;
  if (!mobile_online_intake_container_non_start_ele) return;

  mobile_online_intake_container_non_start_ele.style.height =
    window.innerHeight + "px";
}
