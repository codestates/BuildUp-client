import { initialState } from "./initialState";
import { ACTIONS } from "../actions";

const toDoItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_TODOLIST: {
      // TODO: UPDATE는 UMONUT이후 일괄적으로 보내도 상관없지만,
      // TODO: ADD는 KEY값을 받아와야하므로 꼭 서버와 통신해야한다.
      const newItems = Object.assign([], state.todoItems);
      let item = {
        key: Math.random() * 10000,
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
    default:
      return state;
  }
};

export default toDoItemsReducer;
