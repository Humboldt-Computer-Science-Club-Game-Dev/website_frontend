import { createStore } from "redux";
import reactIsInDevelomentMode from "utilities/isInDevelopment";

function authRouteReducer(
  state = reactIsInDevelomentMode()
    ? "http://localhost:3005"
    : "https://delaire.singularitydevelopment.com",
  newRouteData
) {
  let { type } = newRouteData;
  switch (type) {
    case "update":
      state = newRouteData.route;
      break;
    case "@@redux/INITb.u.6.9.x.b":
      break;
    default:
  }

  return state;
}

export const authRouteStore = createStore(authRouteReducer);

function userReducer(state = null, newUserData) {
  let { type } = newUserData;
  switch (type) {
    case "setUser":
      state = newUserData.user;
      break;
    case "signOut":
      state = null;
      window.localStorage.removeItem("authToken");
      window.location.href = "/signin";
      break;
    default:
  }
  return state;
}

let userStore = createStore(userReducer);

export default userStore;
