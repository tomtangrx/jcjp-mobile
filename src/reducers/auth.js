import _ from "lodash";
import helpers from "../lib/helpers";
import CookieManager from 'react-native-cookies';

export default function authReducer(state = {}, action) {
  state.loading = false;
  switch(action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        user: action.user,
        isAuthenticated: action.user.no ? true : false
      });
    case "IS_AUTHENTICATED":
      return Object.assign({}, state, {
        isAuthenticated: !!action.cookie["jcjp.sid"],
        cookie: action.cookie
      });
    default:
      return state;
  }
}

