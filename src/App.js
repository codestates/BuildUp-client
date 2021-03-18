import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import Modal from "./components/Modal";
import "./App.css";
import "./MyPage.css";
import "./MainPage.css";
import "./Modal.css";

function App() {
  const [isModalOpen, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!isModalOpen);
  };

  return (
    <React.Fragment>
      <Modal toggleModal={toggleModal} />
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
