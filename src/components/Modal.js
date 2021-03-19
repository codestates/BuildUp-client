import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../actions/index";
import Login from "./modals/Login";
import SignUp from "./modals/SignUp";
import TodoManager from "./modals/TodoManager";

function Modal() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalStateReducer);
  const modalTypeState = useSelector((state) => state.modalTypeReducer);
  const isModalOpen = modalState.modalStatus;
  const { modalType } = modalTypeState;

  const handleModalToggle = () => {
    dispatch(toggleModal());
  };

  // TODO Modal Type에 따라 Body를 변경합니다.
  let modalBody = "";
  if (modalType === "LOGIN")
    modalBody = <Login handleModalToggle={handleModalToggle} />;
  else if (modalType === "SIGNUP")
    modalBody = <SignUp handleModalToggle={handleModalToggle} />;
  else if (modalType === "TODOMANAGER")
    modalBody = <TodoManager handleModalToggle={handleModalToggle} />;

  const className = isModalOpen ? "" : "active";

  return (
    <div id="modal-container" className={[className]}>
      {modalBody}
    </div>
  );
}

export default Modal;
