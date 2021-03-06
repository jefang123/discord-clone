import { SEARCH_SERVERS } from "../actions/search_actions";

export default (state=[], action) => {
  Object.freeze(state);
  switch (action.type) {
    case SEARCH_SERVERS:
      return action.results
    default:
      return state;
  }
};
