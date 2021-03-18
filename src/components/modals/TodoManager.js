import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function TodoManager(props) {
  const dateSelectorState = useSelector((state) => state.dateSelectorReducer);
  const { dateSelector } = dateSelectorState;

  const handleDateChangerRight = () => {};
  const handleDateChangerLeft = () => {};
  const handleRemoveTodo = () => {};
  return (
    <>
      <div id="modal-header">
        <span></span>
        <button onClick={handleDateChangerLeft}>&#60;</button>
        <span>
          {dateSelector.month}월{dateSelector.day}일
        </span>
        <button onClick={handleDateChangerRight}>&#62;</button>
        <button onClick={props.handleModalToggle}>X</button>
      </div>
      <div id="modal-section">
        {/* Hard coding */}
        <div>
          <button onClick={handleRemoveTodo}>X</button>
          <span>TODO LIST BLAHBLAH</span>
        </div>
        <div>
          <button onClick={handleRemoveTodo}>X</button>
          <span>TODO LIST BLAHBLAH</span>
        </div>
        <div>
          <button onClick={handleRemoveTodo}>X</button>
          <span>TODO LIST BLAHBLAH</span>
        </div>
      </div>
      <div id="modal-footer">
        <button>+</button>
        <span>새로운 TODO 추가</span>
      </div>
    </>
  );
}

export default TodoManager;
