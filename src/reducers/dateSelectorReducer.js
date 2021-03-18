import { ACTIONS } from "../actions";
import { initialState } from "./initialState";

const modalTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_DATESELECTOR: {
      return Object.assign({}, state, {
        dateSelector: {
          year: action.payload.year,
          month: action.payload.month,
          day: action.payload.day,
        },
      });
    }
    default:
      return state;
  }
};

export default modalTypeReducer;
