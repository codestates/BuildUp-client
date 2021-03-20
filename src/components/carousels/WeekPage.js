import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../temporary-CSS-for-Carousel.css";
import { js_date } from "../../utilities/index.js";
import WeekTodoSubContainer from "./WeekTodoSubContainer";
import "./temporary-CSS-weekTodoContainer.css";

function WeekPage() {
  const [time, setTime] = useState(new Date());
  const [day, setDay] = useState(js_date.getDay(time));
  const [weekArr, setWeekArr] = useState([]);

  const getWeekArr = (time) => {
    const idx = js_date.getLabel(time, "number");

    const [year, month, day] = [
      js_date.getYear(time, "number"),
      js_date.getMonth(time, "number"),
      js_date.getDay(time, "number"),
    ];

    const sorted = [];
    for (let i = 0; i < 7; i++) {
      let dayMinus = 0;
      if (day - idx + 1 <= 0) {
        dayMinus = -1;
      }
      const pos = new Date(year, month - 1 + dayMinus, day - idx + i);
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
        {}
        {weekArr.map((el, idx) => {
          return (
            <WeekTodoSubContainer pos={el} key={idx}></WeekTodoSubContainer>
          );
        })}
      </div>
    </section>
  );
}

export default WeekPage;
