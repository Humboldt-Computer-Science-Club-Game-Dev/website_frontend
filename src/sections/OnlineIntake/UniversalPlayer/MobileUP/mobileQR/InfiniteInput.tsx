import { useState, useEffect } from "react";
import { removeElementAtIndex } from "utilities";

function InfiniteInput({
  subStep,
  loadedSubStep,
  updateWithLoadedSubStep,
}: any) {
  //Where the issue of inputs not show up is coming from
  const [infInputs, setInfInputs] = useState<any>(
    loadedSubStep?.questions || [{ questions: [{}] }]
  );

  return infInputs.map((infInput: any, i: number) => (
    <section
      key={i + 100}
      className={`inf_input_item_container ${i !== 0 ? "mt-2" : ""}`}
    >
      <h1>{subStep.context.title}</h1>
      {subStep.questionStructure.map((question: any, j: number) => {
        return (
          <section key={j + 2000} className={`input_pair`}>
            <label htmlFor={question.id} key={subStep?.ID}>
              {question.question}
            </label>
            <input
              id={question.id}
              placeholder={question.placeholder}
              type={question.type}
              onChange={(e) => {
                onChange(e, i, j);
              }}
              defaultValue={getDefaultValue(i, j, question)}
            />
          </section>
        );
      })}

      <button onClick={onAdd} className="add_button">
        {subStep.context.add_title}
      </button>
      <RemoveButton i={i} />
    </section>
  ));

  function onRemove(i: number) {
    const newInfInputs = removeElementAtIndex(infInputs, i);
    setInfInputs([...JSON.parse(JSON.stringify(newInfInputs))]);
  }

  function onAdd() {
    const newInfiniteInputQuestion: InfiniteInputQuestion[] =
      subStep.questionStructure;
    const newInfInputs = [...infInputs, newInfiniteInputQuestion];
    setInfInputs(newInfInputs);
  }

  function getDefaultValue(i: number, j: number, question: any) {
    const loadedAnswer =
      loadedSubStep && loadedSubStep[i] && loadedSubStep[i][j]
        ? loadedSubStep[i][j]?.answer
          ? loadedSubStep[i][j]?.answer
          : ""
        : "";
    const infInputAns =
      infInputs && infInputs[i] && infInputs[i][j]
        ? infInputs[i][j]?.answer
          ? infInputs[i][j]?.answer
          : ""
        : "";
    return loadedAnswer || question?.answer || infInputAns;
  }

  function onChange(e: any, i: number, j: number) {
    const newInfInputs: [InfiniteInputQuestion[]] = JSON.parse(
      JSON.stringify(infInputs)
    );
    if (!newInfInputs[i]) {
    }
    newInfInputs[i][j].answer = e.target.value;
    setInfInputs(newInfInputs);

    const ID: string = subStep.ID;
    const type: string = subStep.type;
    const context: {
      title: string;
      content_title: string;
      add_title: string;
      remove_title: string;
    } = subStep.context;
    const questionStructure: InfiniteInputQuestion[] =
      subStep.questionStructure;

    const questions: [InfiniteInputQuestion[]] = [...newInfInputs];

    const loadedSubStep: LoadedInfiniteInput = {
      ID,
      type,
      context,
      questionStructure,
      questions,
    };
    updateWithLoadedSubStep(loadedSubStep);
  }

  function RemoveButton({ i }: any) {
    return infInputs.length > 1 ? (
      <button
        onClick={() => {
          onRemove(i);
        }}
        className="remove_button"
      >
        {subStep.context.remove_title}
      </button>
    ) : (
      <></>
    );
  }
}

export default InfiniteInput;

type LoadedInfiniteInput = {
  ID: string;
  type: string;
  context: {
    title: string;
    content_title: string;
    add_title: string;
    remove_title: string;
  };
  questionStructure: InfiniteInputQuestion[];
  questions: [InfiniteInputQuestion[]];
  validation?: {
    required: boolean;
    regex?: string;
    error?: string;
    min?: number;
    max?: number;
  };
};

type InfiniteInputQuestion = {
  id: string;
  question: string;
  placeholder: string;
  type: string;
  answer?: string;
  validation: {
    required: boolean;
    regex?: string;
    error?: string;
    min?: number;
    max?: number;
  };
};
