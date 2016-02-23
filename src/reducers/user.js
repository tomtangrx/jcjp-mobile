var statistics = {};
export default function userReducer(state = {
  statistics: {}
}, action) {
  state.loading = false;
  switch(action.type) {
    case 'GET_USER_STATISTICS':
      statistics[action.id] = action.user;
      return Object.assign({}, state, {statistics: statistics});
    default:
      return state;
  }
}


