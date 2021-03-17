import { combineReducers } from "redux";
const initialState = require("./initialState");

const rootReducer = combineReducers({
  reducer1: (state = initialState, action) => {
    return state;
  },
  //...
});

export default rootReducer;
