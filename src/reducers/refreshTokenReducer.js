import { initialState } from "./initialState";
import { ACTIONS } from "../actions/index";

const refreshTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_REFRESHTOKEN: {
      return Object.assign({}, state, {
        refreshToken: action.payload.refreshToken,
      });
    }
    default:
      return state;
  }
};

export default refreshTokenReducer;
