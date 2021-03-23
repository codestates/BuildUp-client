import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import Modal from "./components/Modal";
import "./css/App.css";
import "./css/MyPage.css";
import "./css/MainPage.css";
import "./css/Modal.css";
import "./css/Modal-Login.css";
import "./css/Modal-SignUp.css";
import { useFetch } from "./utilities/index";
const axios = require("axios");
const scheme = process.env.REACT_APP_SERVER_SCHEME;
const host = process.env.REACT_APP_SERVER_HOST;
const port = process.env.REACT_APP_SERVER_PORT;
const url = `${scheme}://${host}:${port}$/todo/update`;

function App() {
  const todoItemsState = useSelector((state) => state.toDoItemsReducer);
  const todoItems = todoItemsState.todoItems;

  useEffect(() => {
    return () => {
      // TODO: 각 Item마다 한 번씩 UPDATE를 보내는 것으로 하였으나, 배열로 보내는게 나을 수도 있다.
      axios
        .post(url, { data: todoItems })
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
    };
  });
  return (
    <React.Fragment>
      <Modal />
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact patch="/profile">
            <MyPage />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
