import { createStore } from 'redux';

function isApiLoadingReducer(state, newLoadingStatus) {
   if (newLoadingStatus.type === 'pageDataUpdate') {
      state.isPageLoading = newLoadingStatus.isPageLoading;
   } else if (newLoadingStatus.type === 'navDataUpdate') {
      state.isNavLoading = newLoadingStatus.isNavLoading;
   } else state = { isPageLoading: true, isNavLoading: true };
   return state;
}

let isAPILoadingStore = createStore(isApiLoadingReducer);

export default isAPILoadingStore;
