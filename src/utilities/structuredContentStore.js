import { createStore } from 'redux';

function structuredContentReducer(state = {}, newStructuredContent) {
   switch (newStructuredContent.type) {
      case 'updateCurrentPage':
         state.currentPage = newStructuredContent.currentPage;
         break;
      case 'updateNav':
         state.nav = newStructuredContent.navOptionsObject;
         state.footer = newStructuredContent.footerSpecificData;
         break;
      default:
         break;
   }

   return state;
}

let structuredContentStore = createStore(structuredContentReducer);

export default structuredContentStore;
