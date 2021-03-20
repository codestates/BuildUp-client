const data = require("../Data");

export const initialState = {
  userInfo: {
    username: null,
    email: null,
  },
  // todoItems: [],
  todoItems: data.data,
  loginStatus: false,
  accessToken: null,
  refreshToken: null,
  modalStatus: false,
  modalType: null,
  dateSelector: { year: "", month: "", day: "" },
};
