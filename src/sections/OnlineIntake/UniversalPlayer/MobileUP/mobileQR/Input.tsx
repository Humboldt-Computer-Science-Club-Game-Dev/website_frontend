function Input({ subStep, updateWithLoadedSubStep, loadedSubStep }: any) {
  return subStep.questions.map((question: any, i: number) => (
    <section key={i} className={`input_pair ${i !== 0 ? "mt-2" : ""}`}>
      <label htmlFor={question.id}>{question.question}</label>
      <input
        id={question.id}
        placeholder={question.placeholder}
        type={question.type}
        onChange={(e) => {
          const newLoadedSubStep = {
            ...subStep,
            questions: subStep.questions.map((q: any, j: number) => {
              if (j === i) {
                return { ...q, answer: e.target.value };
              }

              return loadedSubStep?.questions[j] || subStep?.questions[j];
            }),
          };
          updateWithLoadedSubStep(newLoadedSubStep);
        }}
        defaultValue={
          loadedSubStep?.questions[i]?.answer || question.answer || ""
        }
      />
    </section>
  ));
}

export default Input;
