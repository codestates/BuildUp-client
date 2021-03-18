import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../actions/index";

function Modal() {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modalStateReducer);
  const isModalOpen = modalState.modalStatus;

  const handleModalToggle = () => {
    dispatch(toggleModal());
  };

  useEffect(() => {
    // ComponentDidMount, Update
    // Component Unmount
    return () => {};
  });
  return (
    <div id="modal-container" className={isModalOpen ? "deactive" : "active"}>
      <span>Modal</span>
      <button onClick={handleModalToggle}>확인</button>
    </div>
  );
}

// class Modal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { isOpen: false };
//     this.toggleWindow = this.toggleWindow.bind(this);
//   }

//   toggleWindow() {
//     this.setState({ isOpen: !this.state.isOpen });
//   }

//   render() {
//     return <div></div>;
//   }
// }

export default Modal;
