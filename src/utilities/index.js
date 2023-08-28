import { useRef, useEffect } from "react";
export { default as createMarginPaddingObject } from "./createMarginPaddingObject";
export { default as useSize } from "./useSize";
export { default as useIsMobile } from "./useIsMobile";
export { default as removeElementAtIndex } from "./removeElementAtIndex";
/* export { default as useItemSet } from './useItemSet'; */

let utils = {
  removeClass: (ele, className) => {
    if (!ele) {
      console.error("ele in remove class is not defined");
      return;
    }
    while (ele.classList.contains(className)) {
      ele.classList.remove(className);
    }
  },
  addClass: (ele, className) => {
    if (!ele.classList.contains(className)) {
      ele.classList.add(className);
    }
  },
  hideEle: (ele) => {
    ele.classList.add("d-none");
  },
  showEle: (ele) => {
    utils.removeClass(ele, "d-none");
  },
  getAuthToken: () => {
    let authToken = window.localStorage.getItem("authToken");
    return authToken;
  },
  deepEqual: (x, y) => {
    if (x === y) {
      return true;
    } else if (
      typeof x == "object" &&
      x !== null &&
      typeof y === "object" &&
      y !== null
    ) {
      if (Object.keys(x).length !== Object.keys(y).length) return false;

      for (var prop in x) {
        if (y.hasOwnProperty(prop)) {
          if (!utils.deepEqual(x[prop], y[prop])) return false;
        } else return false;
      }

      return true;
    } else return false;
  },
  usePrevious: (value) => {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef();
    // Store current value in ref
    useEffect(() => {
      ref.current = value;
    }, [value]); // Only re-run if value changes
    // Return previous value (happens before update in useEffect above)
    return ref.current;
  },
  formatDataString: (dateString) => {
    dateString = dateString.split(":")[0];
    const dateArray = dateString.split("-");
    const rawD = dateArray[2].split("T")[0].replace("0", "");
    const rawM = dateArray[1];
    const rawY = dateArray[0];
    return `${utils.monthNumberToSting(rawM)} ${rawD}, ${rawY}`;
  },
  monthNumberToSting: (dateNumber) => {
    if (typeof dateNumber === "string") dateNumber = parseInt(dateNumber);
    switch (dateNumber) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Error";
    }
  },
};

export default utils;
