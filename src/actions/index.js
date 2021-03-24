// Action Types
const axios = require("axios");

export const ACTIONS = {
  // User
  SET_USERINFO: "SET_USERINFO",
  TOGGLE_LOGINSTATUS: "TOGGLE_LOGINSTATUS",
  // Token
  SET_ACCESSTOKEN: "SET_ACCESSTOKEN",
  SET_REFRESHTOKEN: "SETREFRESHTOKEN",
  // Modal
  TOGGLE_MODAL: "TOGGLE_MODAL",
  SET_MODALTYPE: "SET_MODALTYPE",
  // Date Selector
  SET_DATESELECTOR: "SET_DATESELECTOR",
  // TODO
  CREATE_TODOLIST: "CREATE_TODOLIST",
  UPDATE_TODOLIST: "UPDATE_TODOLIST",
  GET_TODOLIST: "GET_TOSOLIST",
  DELETE_TODOLIST: "REMOVE_TODOLIST",
  //Google SignIn
};

// Action Creator Funcs

// export const fetchData = (
//   action,
//   [api, method, data, headers, withCredentials],
// ) => (dispatch) => {
//   return axios({
//     url: api,
//     method: method,
//     data: data,
//     headers: headers,
//     withCredentials: withCredentials,
//   })
//     .then((data) => dispatch(action(data)))
//     .catch((err) => console.log("Fetch Error", err));
// };

// -------------User--------------- //

export const setUserInfo = (username, email) => {
  return {
    type: ACTIONS.SET_USERINFO,
    payload: { username, email },
  };
};

export const toggleLoginStatus = () => {
  return {
    type: ACTIONS.TOGGLE_LOGINSTATUS,
  };
};

// -------------Access, Refresh Token--------------- //

export const setAccessToken = (accessToken) => {
  return {
    type: ACTIONS.SET_ACCESSTOKEN,
    payload: { accessToken },
  };
};

export const setRefreshToken = (refreshToken) => {
  return {
    type: ACTIONS.SET_REFRESHTOKEN,
    payload: { refreshToken },
  };
};

// -------------Modal--------------- //

export const toggleModal = () => {
  return {
    type: ACTIONS.TOGGLE_MODAL,
  };
};

export const setModalType = (type) => {
  return {
    type: ACTIONS.SET_MODALTYPE,
    payload: { type },
  };
};

// -------------Modal--------------- //

export const setDateSelector = (year, month, day) => {
  console.log("DAY-SELECTOR:", year, month, day);

  return {
    type: ACTIONS.SET_DATESELECTOR,
    payload: { year, month, day },
  };
};

// -------------TodoList--------------- //
export const getTodoList = (todoItems) => {
  return {
    type: ACTIONS.GET_TODOLIST,
    payload: { items: todoItems },
  };
};

export const createTodoList = ({ id, order, content, date }) => {
  return {
    type: ACTIONS.CREATE_TODOLIST,
    payload: { id, order, content, date },
  };
};

export const updateTodoList = ({ id, order, content, checked }) => {
  return {
    type: ACTIONS.UPDATE_TODOLIST,
    payload: { id, order, content, checked },
  };
};

export const deleteTodoList = ({ id }) => {
  return {
    type: ACTIONS.DELETE_TODOLIST,
    payload: { id },
  };
};
