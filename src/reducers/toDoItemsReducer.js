import { initialState } from "./initialState";
import { jwt_isExpired, fetch_custom } from "../utilities/index";
import { ACTIONS } from "../actions";
const axios = require("axios");

const toDoItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_TODOLIST: {
      // TODO: 서버와 통신후 결과값만 받아옵니다.
      const newItems = Object.assign([], state.todoItems);
      let item = {
        id: action.payload.id,
        order: action.payload.order,
        checkd: false,
        content: action.payload.content,
        date: action.payload.date,
      };
      return Object.assign({}, state, {
        todoItems: [...state.todoItems, item],
      });
    }

    case ACTIONS.UPDATE_TODOLIST: {
      // payload is {id, content, order, checked}
      const newItems = Object.assign([], state.todoItems);
      let target;
      let idx;
      for (let i = 0; i < state.todoItems.length; i++) {
        const item = state.todoItems[i];
        if (`${item.id}` === `${action.payload.id}`) {
          idx = i;
          break;
        }
      }

      newItems[idx].content = action.payload.content;
      newItems[idx].order = action.payload.order;
      newItems[idx].checked = action.payload.checked;

      return Object.assign({}, state, {
        todoItems: newItems,
      });
    }

    case ACTIONS.GET_TODOLIST: {
      return Object.assign({}, state, {
        todoItems: action.payload.items,
      });
    }

    default:
      return state;
  }
};

export default toDoItemsReducer;
