import { initialState } from "./initialState";
import { ACTIONS } from "../actions/index";

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_USERINFO: {
      return Object.assign({}, state, {
        userInfo: {
          username: action.payload.username,
          email: action.payload.email,
        },
      });
    }
    default:
      return state;
  }
};

export default userInfoReducer;
