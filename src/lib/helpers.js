import _ from "lodash";
import config from "../../config";

import Chapter from "../containers/Chapter";
import Quiz from "../containers/Quiz";
import CookieManager from 'react-native-cookies';

var helpers = {
  fetchData: function(url, opts) {
    opts = opts || {};
    opts = _.assign({}, opts, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "referer": "iosApp",
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined
    });
    return fetch(url, opts).then(function(response) {
      if (response.status >= 200 && response.status < 300) {
        var cookie = response.headers.get("set-cookie");
        return response.json();
      } else {
        return {error: response._bodyText};
      }
    });
  },
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  routes: {
    getChapter: function(type, level, chapter) {
      return {
        title: helpers.capitalize(type) + " Chapter " + chapter,
        rightButtonTitle: 'Chapter Test',
        onRightButtonPress: () => {
          this.props.navigator.push({
            title: helpers.capitalize(type) + " Chapter " + chapter + " Test",
            component: Quiz,
            passProps: {
              actions: this.props.actions,
              name: type+level+chapter,
              settings: {
                chapter: chapter,
                type: [type],
                level: [level],
                kind: type,
                quiz: true
              }
            },
          });
        },
        component: Chapter,
        passProps: {
          type: type,
          chapter: chapter,
          level: level
        }
      };
    },
    lessonChapter: function(type, level, chapter, action) {
      var route = helpers.routes.getChapter.bind(this)(type, level, chapter);
      this.props.navigator[action](route);
    }
  }
};

export default helpers;
