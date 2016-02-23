import config from "../../config";
import helpers from "../lib/helpers";

export function getQuizQuestion(opts) {
  var settings = opts.settings;
  return function(dispatch) {
    return helpers.fetchData(config.APIURL + "/rest/practice/question", {
      body: {settings: settings},
      method: "POST",
    }).then(question => {
      dispatch(function(question) {
        return {
          type: "GET_QUIZ_QUESTION",
          name: opts.name,
          question
        };
      }(question));
    });
  };
}

export function getQuizAnswer(answerData, type, name) {
  return function(dispatch) {
    return helpers.fetchData(config.APIURL + "/rest/practice/answer/"+type, {
      body: answerData,
      method: "POST",
    }).then(answer => {
      dispatch(function(answer) {
        return {
          type: "GET_QUIZ_ANSWER",
          name: name,
          answer
        };
      }(answer));
    });
  };
}

export function resetQuizAnswer(name) {
  return {
    type: "RESET_QUIZ_ANSWER",
    name: name
  };
}
