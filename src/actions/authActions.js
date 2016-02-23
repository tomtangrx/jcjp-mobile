import config from "../../config";
import helpers from "../lib/helpers";
import CookieManager from 'react-native-cookies';


export function login(body) {
  return function(dispatch) {
    return helpers.fetchData(config.APIURL + "/api/auth/login", {
      method: "POST",
      body: body
    }).then(user => {
      dispatch(function(user) {
        return {
          type: "LOGIN",
          user
        };
      }(user));
    });
  };
}

export function getAuth() {
  return function(dispatch) {
    return helpers.fetchData(config.APIURL + "/api/auth/get", {
      method: "GET",
    }).then(user => {
      dispatch(function(user) {
        return {
          type: "LOGIN",
          user
        };
      }(user));
    });
  };
}

export function isAuthenticated(callback) {
  return dispatch => {
    CookieManager.getAll((cookie, res) => {
      dispatch(function(cookie, res) {
        return {
          type: "IS_AUTHENTICATED",
          cookie
        };
      }(cookie, res));
    });
  };
}
