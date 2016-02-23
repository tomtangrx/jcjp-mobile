import config from "../../config";
import helpers from "../lib/helpers";
import CookieManager from 'react-native-cookies';


export function getLessonsList(opts) {
  return function(dispatch) {
    return helpers.fetchData(config.APIURL + "/api/lessons/list", {
      method: "GET",
      cookie: opts.cookie
    }).then(list => {
      dispatch(function(list) {
        return {
          type: "GET_LESSONS_LIST",
          list
        };
      }(list));
    });
  };
}
