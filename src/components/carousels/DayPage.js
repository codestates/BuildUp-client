import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/temporary-CSS-for-Carousel.css";
import DayTodoItemList from "./DayTodoContainer";
import { js_date } from "../../utilities/index.js";

function DayPage() {
  const [time, setTime] = useState(new Date());
  const [day, setDay] = useState(js_date.getDay(time));

  useEffect(() => {
    let timeOutId = setInterval(() => {
      const newTime = new Date();
      const newTimeDay = js_date.getDay(newTime);
      if (day !== newTimeDay) {
        setDay(newTimeDay);
      }

      setTime(newTime);
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [day]);

  return (
    <section id="day-container">
      <header id="day-main">
        <span id="day-title">
          {js_date.getMonth(time)}. {js_date.getDay(time)}.{" "}
          {js_date.getLabel(time).toUpperCase()}
        </span>
      </header>
      <section id="day-todo-container">
        <div id="day-button-container">
          <button className="day-btn-add-todo">새로운 TODO 추가하기</button>
        </div>
        <DayTodoItemList pos={time} />
      </section>
    </section>
  );
}

export default DayPage;
