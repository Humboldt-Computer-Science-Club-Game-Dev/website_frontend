import Error from "sections/OnlineIntake/Error";
function Selection({ subStep, updateWithLoadedSubStep, loadedSubStep }: any) {
  const question = loadedSubStep?.questions[0];
  const options = question?.options;
  const type = getTypeOfQuestion(question);
  if (!question) return <Error reason="No question found in substep" />;
  if (!options) return <Error reason="No options found in question" />;
  return (
    <section className="selection_container">
      <h1>{question.question}</h1>
      {options.map((option: any, i: number) => {
        let answers = determineQuestionAnswer(loadedSubStep?.questions[0]);
        const isClicked = determineIfIsClicked(answers, option.value);
        return (
          <label
            key={i}
            onClick={(event) => {
              event.stopPropagation();
            }}
            className={`${isClicked ? "clicked" : ""}`}
          >
            <input
              name={subStep?.ID}
              type={option?.type}
              defaultValue={option?.value}
              className="fake_custom_radio"
              onClick={() => {
                console.log("Click here?");
                console.log("Click");
                const newLoadedSubStep = JSON.parse(
                  JSON.stringify(loadedSubStep)
                );
                let answerCopy = JSON.parse(JSON.stringify(answers));
                const isAnswered = determineIfIsClicked(
                  answerCopy,
                  option.value
                );

                if (isAnswered) {
                  console.log(
                    "Removing answer",
                    JSON.parse(JSON.stringify(isClicked)),
                    answerCopy,
                    option.value
                  );
                  const index = answerCopy.indexOf(option.value);
                  answerCopy.splice(index, 1);
                } else {
                  if (type === "check") {
                    answerCopy.push(option.value);
                  } else {
                    answerCopy = [option.value];
                  }
                }

                newLoadedSubStep.questions[0].answers = answerCopy;
                console.log(
                  "New loaded substep:",
                  newLoadedSubStep,
                  answerCopy,
                  newLoadedSubStep.questions[0]
                );
                updateWithLoadedSubStep(newLoadedSubStep);
              }}
            ></input>
            <span className="real_radio">
              {isClicked ? (
                <img src="icons/white_check.svg" alt="checked" />
              ) : (
                <></>
              )}
            </span>
            <span className="label_text">{option.label}</span>
          </label>
        );
      })}
    </section>
  );
}

function getTypeOfQuestion(question: any) {
  return question?.type === "selection_check" ? "check" : "radio";
}

function determineQuestionAnswer(question: any) {
  return question?.answers || [];
}

function determineIfIsClicked(answer: any, value: any) {
  if (!answer) return false;
  return answer.includes(value);
}

export default Selection;
