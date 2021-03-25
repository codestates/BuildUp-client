import { initialState } from "./initialState";
import { ACTIONS } from "../actions/index";

const accessTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_ACCESSTOKEN: {
      console.log("*ACCESS TOKEN을 REDUX STORE에 저장합니다.*");
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
      });
    }
    default:
      return state;
  }
};

export default accessTokenReducer;
