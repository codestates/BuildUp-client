import { ACTIONS } from "../actions";
import { initialState } from "./initialState";

const modalStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_MODAL: {
      return Object.assign({}, state, {
        modalStatus: !state.modalStatus,
      });
    }
    default:
      return state;
  }
};

export default modalStatusReducer;
