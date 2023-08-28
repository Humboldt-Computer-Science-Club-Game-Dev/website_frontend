let helpers = {
   removeClassFromRef: (ref, remove) => {
      if (!ref || !ref.current) {
         console.error(
            'Returned out of function early. Given ref is not defined enoughf'
         );
      }

      let newClassNameArray = ref.current.className
         .split(' ')
         .filter(className => {
            return className !== remove;
         });
      newClassNameArray = newClassNameArray.join(' ');

      ref.current.className = newClassNameArray;
   },

   addClassFromRef: (ref, newClass) => {
      if (!ref || !ref.current) {
         console.error(
            'Returned out of function early. Given ref is not defined enoughf'
         );
         return;
      }
      if (
         ref.current.className &&
         ref.current.className.indexOf(newClass) >= 0
      ) {
         return;
      }
      ref.current.className += ` ${newClass}`;
   },
   addClassToEle: (ele, className) => {
      if (!ele) {
         console.error('Must provide ele to this function');
         return;
      }
      if (ele.classList.contains(className)) {
         return;
      }
      ele.classList.add(className);
   },
   removeClassFromEle: (ele, className) => {
      if (!ele) {
         console.error('Must provide ele to this function');
         return;
      }
      while (ele.classList.contains(className)) {
         ele.classList.remove(className);
      }
   },
   isDarkRoute: () => {
      let routesWithDarkBG = [''];

      /* Imporve this check as it become nessisary */
      if (!routesWithDarkBG.includes(window.location.pathname.split('/')[1])) {
         return true;
      }
      return false;
   },
   isHovering: e => {
      let isHovering = e.parentElement.querySelector(':hover') === e;
      return isHovering;
   },
};
export default helpers;
