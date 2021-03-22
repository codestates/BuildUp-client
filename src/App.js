import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import Modal from "./components/Modal";
import "./css/App.css";
import "./css/MyPage.css";
import "./css/MainPage.css";
import "./css/Modal.css";
import "./css/Modal-Login.css";
import "./css/Modal-SignUp.css";

function App() {
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
      <div className="bg-image"></div>
    </React.Fragment>
  );
}

export default App;
