import { ACTIONS } from "../actions";
import { initialState } from "./initialState";

const modalTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_MODALTYPE: {
      return Object.assign({}, state, {
        modalType: action.payload.type,
      });
    }
    default:
      return state;
  }
};

export default modalTypeReducer;
