import { format } from "date-fns";

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
  dateSelector: {
    year: format(new Date(), "yyyy"),
    month: format(new Date(), "MM"),
    day: format(new Date(), "dd"),
  },
};
