import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import NotFound from "./pages/NotFound";
import BadRequest from "./pages/BadRequest";
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
  const loginState = useSelector((state) => state.loginStatusReducer);
  const isLogin = loginState.loginStatus;

  return (
    <React.Fragment>
      <Modal />
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route path="/profile">{isLogin ? <MyPage /> : <BadRequest />}</Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
