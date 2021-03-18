import React, { useImperativeHandle, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import ProfilePassword from "../components/ProfilePassword";

export default function MyPage() {
  return (
    <div id="myPage-body">
      <Sidebar />
      <section id="myPage">
        <div id="title">Profile</div>
        <Router>
          <Switch>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/profile/password">
              <ProfilePassword />
            </Route>
          </Switch>
        </Router>
      </section>
    </div>
  );
}
