export default function lessonReducer(state = {}, action) {
  state.loading = false;
  switch(action.type) {
    case 'GET_LESSONS_LIST':
      return Object.assign({}, state, {
        list: action.list
      });
    default:
      return state;
  }
}

