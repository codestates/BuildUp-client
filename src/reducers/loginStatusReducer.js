import { ACTIONS } from "../actions";
import { initialState } from "./initialState";

const loginStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_LOGINSTATUS: {
      return Object.assign({}, state, {
        loginStatus: !state.loginStatus,
      });
    }

    default:
      return state;
  }
};

export default loginStatusReducer;
