import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <Router>
      <div>Hello World</div>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact patch="/user">
          <MyPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
