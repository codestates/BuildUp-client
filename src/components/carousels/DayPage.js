import React, { useState } from "react";
import "../css/temporary-CSS-for-Carousel.css";
import DayTodoItemList from "./DayTodoContainer";
import { js_date } from "../../utilities/index.js";

function DayPage() {
  const [time, setTime] = useState(new Date());
  const [isTextareaActive, setTextareaActive] = useState(false);

  const handleToggleTextarea = () => {
    setTextareaActive(!isTextareaActive);
  };

  return (
    <section id="day-container">
      <header id="day-main">
        <span id="day-title">
          {js_date.getMonth(time)}. {js_date.getDay(time)}.{" "}
          {js_date.getLabel(time).toLowerCase()}
        </span>
      </header>
      <section id="day-todo-container">
        <div id="day-button-container">
          {isTextareaActive ? (
            <>
              <textarea className="day-textarea"></textarea>
              <button className="day-btn-confirm-cancel">확인</button>
              <button
                className="day-btn-confirm-cancel"
                onClick={handleToggleTextarea}
              >
                취소
              </button>
            </>
          ) : (
            <button className="day-btn-add-todo" onClick={handleToggleTextarea}>
              새로운 TODO 작성하기
            </button>
          )}
        </div>
        <DayTodoItemList pos={time} />
      </section>
    </section>
  );
}

export default DayPage;
