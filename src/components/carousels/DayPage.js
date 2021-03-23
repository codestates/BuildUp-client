import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../css/temporary-CSS-for-Carousel.css";
import DayTodoItemList from "./DayTodoContainer";
import { js_date } from "../../utilities/index.js";
import { createTodoList } from "../../actions/index";
import { format } from "date-fns";

function DayPage() {
  const dispatch = useDispatch();
  const [time, setTime] = useState(new Date());
  const [maxOrder, setMaxOrder] = useState(0);
  const [isTextareaActive, setTextareaActive] = useState(false);
  const [word, setWord] = useState("");

  const handleToggleTextarea = () => {
    setTextareaActive(!isTextareaActive);
  };

  const handleAddTodo = () => {
    let date = format(time, "yyyy-MM-dd").split("-");
    const year = date[0].padStart(4, "0");
    const month = date[1].padStart(2, "0");
    const day = date[2].padStart(2, "0");

    date = `${year}-${month}-${day}`;

    dispatch(createTodoList({ content: word, date, order: maxOrder + 1 }));
    setMaxOrder(maxOrder + 1);
    handleToggleTextarea();

    const el = document.getElementsByClassName("day-todo-container-ul")[0];
    el.scrollTo(0, el.scrollHeight);
  };

  const handleUpdateText = (e) => {
    setWord(e.target.value);
  };

  const handleMaxOrder = (number) => {
    setMaxOrder(number);
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
              <textarea
                className="day-textarea"
                onChange={handleUpdateText}
              ></textarea>
              <button
                className="day-btn-confirm-cancel"
                onClick={handleAddTodo}
              >
                확인
              </button>
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
        <DayTodoItemList pos={time} handleMaxOrder={handleMaxOrder} />
      </section>
    </section>
  );
}

export default DayPage;
