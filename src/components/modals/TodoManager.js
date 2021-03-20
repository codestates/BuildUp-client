import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setDateSelector } from "../../actions/index";
import { js_date } from "../../utilities/index.js";
import TodoManagerListContainer from "./TodoManagerListContainer";

function TodoManager(props) {
  const dispatch = useDispatch();
  const dateSelectorState = useSelector((state) => state.dateSelectorReducer);
  const { dateSelector } = dateSelectorState;
  const [text, setText] = useState("");
  const [isTextareaActive, setTextarea] = useState("false");

  const handleDateChangerLeft = () => {
    const { year, month, day } = dateSelector;
    let [newYear, newMonth, newDay] = [year, month, day];

    let monthMinus = -1;
    if (day - 1 <= 0) {
      monthMinus = 0;
      if (month === 0) {
        newMonth = 11;
        newYear = newYear - 1;
      } else newMonth = newMonth - 1;
    }
    newDay = newDay - 1;

    const result = new Date(newYear, newMonth + monthMinus, newDay);

    dispatch(
      setDateSelector(
        js_date.getYear(result),
        js_date.getMonth(result, "number"),
        js_date.getDay(result),
      ),
    );
  };
  const handleDateChangerRight = () => {
    const { year, month, day } = dateSelector;
    const result = new Date(year, month - 1, Number(day) + 1);

    dispatch(
      setDateSelector(
        js_date.getYear(result),
        js_date.getMonth(result),
        js_date.getDay(result),
      ),
    );
  };
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
      </div>
      <div id="modal-section">
        <TodoManagerListContainer />
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
