import { createStore } from 'redux';

function appIsResizing() {
   sizeStore.dispatch({ size: sizeCheck(), type: 'replacement' });
}

function sizeReducer(state, newSizeObj) {
   return newSizeObj.size || sizeCheck();
}

let sizeStore = createStore(sizeReducer, 32);

function isExtraLargeCheck() {
   return window.matchMedia('(min-width: 1920px)').matches ? true : false;
}
function isLargeCheck() {
   return window.matchMedia('(min-width: 1280px)').matches ? true : false;
}
function isMediumCheck() {
   return window.matchMedia('(min-width: 960px)').matches ? true : false;
}
function isSmallCheck() {
   return window.matchMedia('(min-width: 600px)').matches ? true : false;
}
function isExtraSmallCheck() {
   return window.matchMedia('(min-width: 0px)').matches ? true : false;
}

function sizeCheck() {
   if (isExtraLargeCheck()) {
      return 'xl';
   } else if (isLargeCheck()) {
      return 'lg';
   } else if (isMediumCheck()) {
      return 'md';
   } else if (isSmallCheck()) {
      return 'sm';
   } else if (isExtraSmallCheck()) {
      return 'xs';
   } else {
      return 'xs';
   }
}

export let initSize = function () {
   window.addEventListener('resize', appIsResizing);
   appIsResizing();
};
export let getDefault = sizeCheck;
export default sizeStore;
