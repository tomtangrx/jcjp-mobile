import config from "../../config";
import helpers from "../lib/helpers";
import CookieManager from 'react-native-cookies';

export function getUserStatistics(opts) {
  var id = opts.id;
  var sub = opts.sub || "";
  return function(dispatch) {
    var uri = [id, sub].join("/");
    var url = config.APIURL + "/api/user/get/"+ id + (!!sub ? ("/" + sub) : "");
    return helpers.fetchData(url, {
      method: "GET",
    }).then(user => {
      dispatch(function(user) {
        return {
          type: "GET_USER_STATISTICS",
          user,
          id
        };
      }(user));
    });
  };
}
