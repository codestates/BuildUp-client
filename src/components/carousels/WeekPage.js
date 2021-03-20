import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../temporary-CSS-for-Carousel.css";
import { js_date } from "../../utilities/index.js";
import WeekTodoSubContainer from "./WeekTodoSubContainer";

function WeekPage() {
  const [time, setTime] = useState(new Date());
  const [day, setDay] = useState(js_date.getDay(time));
  const [weekArr, setWeekArr] = useState([]);

  const getWeekArr = (time) => {
    const idx = js_date.getLabel(time);
    const [year, month, day] = [
      js_date.getYear(time),
      js_date.getMonth(time),
      js_date.getDay(time),
    ];

    const sorted = [];
    for (let i = 0; i < 7; i++) {
      const pos = new Date(year, month, day - idx + i);
      sorted.push(pos);
    }
    setWeekArr(sorted);
  };

  useEffect(() => {
    getWeekArr(new Date());

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
    <section id="week-container">
      <div id="week-main">
        <span id="week-title">03. 14 - 03. 20 WEEK</span>
      </div>
      <div id="week-todo-container">
        {weekArr.map((el, idx) => {
          return <WeekTodoSubContainer pos={el}></WeekTodoSubContainer>;
        })}
      </div>
    </section>
  );
}

export default WeekPage;
