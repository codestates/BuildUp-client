import { ACTIONS } from "../actions";
import { initialState } from "./initialState";

const dateSelectorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_DATESELECTOR: {
      return Object.assign({}, state, {
        dateSelector: {
          year: Number(action.payload.year),
          month: Number(action.payload.month),
          day: Number(action.payload.day),
        },
      });
    }
    default:
      return state;
  }
};

export default dateSelectorReducer;
