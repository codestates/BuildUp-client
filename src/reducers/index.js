import { combineReducers } from "redux";
import loginStatusReducer from "./loginStatusReducer";
import toDoItemsReducer from "./toDoItemsReducer";
import userInfoReducer from "./userInfoReducer";
import accessTokenReducer from "./accessTokenReducer";
import modalStateReducer from "./modalStatusReducer";
import modalTypeReducer from "./modalTypeReducer";
import dateSelectorReducer from "./dateSelectorReducer";

const rootReducer = combineReducers({
  loginStatusReducer,
  toDoItemsReducer,
  userInfoReducer,
  accessTokenReducer,
  modalStateReducer,
  modalTypeReducer,
  dateSelectorReducer,
});

export default rootReducer;
