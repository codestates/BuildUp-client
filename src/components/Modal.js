import React, { useEffect, useState } from "react";

function Modal() {
  useEffect(() => {
    // ComponentDidMount, Update
    // Component Unmount
    return () => {};
  });
  return <div></div>;
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
