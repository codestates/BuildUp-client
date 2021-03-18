import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function TodoManager(props) {
  const dateSelectorState = useSelector((state) => state.dateSelectorReducer);
  const { dateSelector } = dateSelectorState;
  const [text, setText] = useState("");
  const [isTextareaActive, setTextarea] = useState("false");

  const handleDateChangerRight = () => {};
  const handleDateChangerLeft = () => {};
  const handleRemoveTodo = () => {};
  const handleSendNewTodo = () => {
    // TODO 1. 타당성 검사

    // TODO 2. 이상 없으면 새로운 TODO 추가(Req)

    // TODO 3. 새로운 TODO 목록 수신(Res)

    // TODO 4. 이상 없으면 원래 창으로 복귀
    toggleTextarea();
  };

  const toggleTextarea = () => {
    setTextarea(!isTextareaActive);
  };
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
      {/* Footer */}
      <div id="modal-footer">
        {!isTextareaActive ? (
          <>
            <textarea></textarea>
            <div>
              <button onClick={handleSendNewTodo}>확인</button>
              <button onClick={toggleTextarea}>취소</button>
            </div>
          </>
        ) : (
          <>
            <button onClick={toggleTextarea}>+</button>
            <span>새로운 TODO 추가</span>
          </>
        )}
      </div>
    </>
  );
}

export default TodoManager;
