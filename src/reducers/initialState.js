const data = require("../Data");

export const initialState = {
  userInfo: {
    username: "",
    email: "",
  },
  todoItems: [],
  // todoItems: data.data,
  loginStatus: false,
  accessToken: "",
  modalStatus: false,
  modalType: "",
  dateSelector: { year: "", month: "", day: "" },
};
