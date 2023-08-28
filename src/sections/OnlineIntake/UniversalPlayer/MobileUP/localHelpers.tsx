export function buildSubSteps(loadedComponents: any) {
  if (!loadedComponents) return [];
  const subSteps = [];
  for (let i = 0; i < loadedComponents.length; i++) {
    if (!loadedComponents[i]) continue;
    const loadedChunk = loadedComponents[i];
    if (loadedChunk.type === "input") subSteps.push(loadedChunk);
    if (loadedChunk.type === "infinite_input") subSteps.push(loadedChunk);
    if (loadedChunk.type === "selection") {
      const newSubStepBase = JSON.parse(JSON.stringify(loadedChunk));
      for (let j = 0; j < newSubStepBase.questions.length; j++) {
        const newSubStep = JSON.parse(JSON.stringify(newSubStepBase));
        newSubStep.questions = [newSubStepBase.questions[j]];
        subSteps.push(newSubStep);
      }
    }
  }

  return subSteps;
}
export function typeToClassName(type: string) {
  switch (type) {
    case "input":
      return "input_type";
    case "infinite_input":
      return "infinite_input_type";
    default:
      return "";
  }
}

export function collateLoadedSubSteps(subStepsIn: any) {
  const subSteps = JSON.parse(JSON.stringify(subStepsIn));

  const loadedSubSteps = [];
  const IDArray: String[] = [];
  for (let i = 0; i < subSteps.length; i++) {
    const loadedSubStep = JSON.parse(JSON.stringify(subSteps[i]));
    if (!IDArray.includes(loadedSubStep.ID)) IDArray.push(loadedSubStep.ID);

    if (loadedSubStep.type === "input") loadedSubSteps.push(loadedSubStep);

    //Book mark 07/21/2023 I believe something in the selection section is causing the infinite input to not work and by extension selection to not work
    //Solved: The issues had to do with an else blcok at the end of an if statement. THe else was pushing an unformated substep into the loadedSubSteps array
    if (loadedSubStep.type === "infinite_input") {
      const designatedLoadedSubStepIndex = IDArray.indexOf(loadedSubStep.ID);
      if (!loadedSubSteps[designatedLoadedSubStepIndex])
        loadedSubSteps.push(loadedSubStep);
      else {
        loadedSubSteps[designatedLoadedSubStepIndex].questions.push(
          loadedSubStep.questions[0]
        );
      }
    }

    if (loadedSubStep.type === "selection") {
      const designatedLoadedSubStepIndex = IDArray.indexOf(loadedSubStep.ID);
      if (!loadedSubSteps[designatedLoadedSubStepIndex]) {
        loadedSubSteps.push(loadedSubStep);
      } else {
        loadedSubSteps[designatedLoadedSubStepIndex].questions.push(
          JSON.parse(JSON.stringify(loadedSubStep.questions[0]))
        );
      }
    }
  }

  return loadedSubSteps;
}
