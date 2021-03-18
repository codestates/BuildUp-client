import { combineReducers } from "redux";
import loginStatusReducer from "./loginStatusReducer";
import toDoItemsReducer from "./toDoItemsReducer";
import userInfoReducer from "./userInfoReducer";
import accessTokenReducer from "./accessTokenReducer";
import refreshTokenReducer from "./refreshTokenReducer";
import modalStateReducer from "./modalStatusReducer";

const rootReducer = combineReducers({
  loginStatusReducer,
  toDoItemsReducer,
  userInfoReducer,
  accessTokenReducer,
  refreshTokenReducer,
  modalStateReducer,
});

export default rootReducer;
