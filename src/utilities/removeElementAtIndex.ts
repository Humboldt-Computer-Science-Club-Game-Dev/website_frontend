function removeElementAtIndex(array: any, i: number) {
  if (i >= 0 && i < array.length) {
    array.splice(i, 1);
  }
  return array;
}

export default removeElementAtIndex;
