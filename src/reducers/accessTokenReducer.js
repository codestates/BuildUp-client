import { initialState } from "./initialState";
import { ACTIONS } from "../actions/index";

const accessTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_ACCESSTOKEN: {
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
      });
    }
    default:
      return state;
  }
};

export default accessTokenReducer;
