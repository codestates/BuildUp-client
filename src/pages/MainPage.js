import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, setModalType } from "../actions/index";
import { useHistory } from "react-router";

export default function MainPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const modalState = useSelector((state) => state.modalStateReducer);
  const loginState = useSelector((state) => state.loginStatusReducer);
  const isModalOpen = modalState.modalStatus;
  const isLogin = loginState.loginStatus;

  const handleRedirectProfile = () => {
    history.push("/profile");
  };

  const handleModalToggle = () => {
    if (!isModalOpen) {
      dispatch(toggleModal());
    }
  };

  const handleModalType = (type) => {
    dispatch(setModalType(type));
  };

  const handleLogout = () => {};

  return (
    <div id="main-page">
      <header id="header">
        <div id="header-name">
          <h1>Build Up</h1>
        </div>
        <div id="button-box">
          {!isLogin ? (
            <button
              onClick={() => {
                handleModalToggle();
                handleModalType("SIGNUP");
              }}
            >
              Join
            </button>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
          {!isLogin ? (
            <button
              onClick={() => {
                handleModalToggle();
                handleModalType("LOGIN");
              }}
            >
              Login
            </button>
          ) : (
            <button onClick={handleRedirectProfile}>My Page</button>
          )}
        </div>
      </header>
      <section>
        <div id="top-h"></div>
        <div id="welcome-box">
          <h1 className="welcome-text">환영합니다.</h1>
        </div>
        <div id="btn-beta-box">
          <button className="btn-beta">
            <p>체험해보기</p>
          </button>
        </div>
        <div id="top-l"></div>
      </section>
      <footer>
        <div>dd</div>
      </footer>
    </div>
  );
}
