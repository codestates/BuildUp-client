import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, setModalType } from "../actions/index";
import Login from "./modals/Login";
import SignUp from "./modals/SignUp";
import TodoManager from "./modals/TodoManager";

function Modal() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalStateReducer);
  const modalTypeState = useSelector((state) => state.modalTypeReducer);
  const isModalOpen = modalState.modalStatus;
  const { modalType } = modalTypeState;
  const loginState = useSelector((state) => state.loginStatusReducer);
  const isLogin = loginState.loginStatus;

  useEffect(() => {
    const handleEventClose = (e) => {
      if (e.keyCode === 27 && isModalOpen) {
        dispatch(toggleModal());
      }
    };
    window.addEventListener("keydown", handleEventClose);
  }, [isModalOpen, dispatch]);

  const handleModalToggle = () => {
    dispatch(toggleModal());
  };

  const handleModalType = (type) => {
    dispatch(setModalType(type));
  };

  // TODO Modal Type에 따라 Body를 변경합니다.
  let modalBody = "";
  if (modalType === "LOGIN")
    modalBody = (
      <Login
        handleModalToggle={handleModalToggle}
        handleModalType={() => {
          handleModalType("SIGNUP");
        }}
      />
    );
  else if (modalType === "SIGNUP")
    modalBody = (
      <SignUp
        handleModalToggle={handleModalToggle}
        handleModalType={() => {
          handleModalType("LOGIN");
        }}
      />
    );
  else if (modalType === "TODOMANAGER")
    modalBody = <TodoManager handleModalToggle={handleModalToggle} />;

  const className = isModalOpen ? "active" : "deactive";
  return (
    <div id="modal-container" className={[className]}>
      <div id="modal-container-line">
        <button className="modal-signup-close" onClick={handleModalToggle}>
          &times;
        </button>
      </div>
      <div>{modalBody}</div>
    </div>
  );
}

export default Modal;
