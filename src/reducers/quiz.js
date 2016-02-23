var answer = {};
var question = {};
export default function quizReducer(state = {
  answer: null,
  question: null
}, action) {
  state.loading = false;
  switch(action.type) {
    case 'GET_QUIZ_QUESTION':
      question[action.name] = action.question;
      return Object.assign({}, state, {question: question});

    case 'GET_QUIZ_ANSWER':
      answer[action.name] = action.answer;
      return Object.assign({}, state, {answer: answer});

    case 'RESET_QUIZ_ANSWER':
      answer[action.name] = undefined;
      return Object.assign({}, state, {answer: answer});

    default:
      return state;
  }
}



