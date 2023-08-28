import { createStore } from 'redux';

function routeStoreReducer(
   state = { currentLocation: window.location.pathname },
   newState
) {
   switch (newState.type) {
      case 'updateCurrentLocation':
         window.history.pushState(
            {},
            'Site navigation',
            newState.currentLocation
         );
         state.currentLocation = newState.currentLocation;
         break;
      default:
         break;
   }

   return state;
}

export default createStore(routeStoreReducer);
