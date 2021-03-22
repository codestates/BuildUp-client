import React, { useEffect, useState } from "react";
import "../css/temporary-CSS-for-Carousel.css";
import { js_date } from "../../utilities/index.js";
import WeekTodoSubContainer from "./WeekTodoSubContainer";
import "../css/temporary-CSS-weekTodoContainer.css";
import { startOfWeek, addDays, format } from "date-fns";

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

  const renderDays = () => {
    const dateFormat = "MM. dd. eee";
    const days = [];
    let startDate = startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="week-todo-subtitle" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>,
      );
    }
    return days;
  };

  return (
    <section id="week-container" className="disable-select week-title-font">
      <div id="week-main-title">
        <span id="week-title" className="week-title-font">
          Week
        </span>
      </div>
      <div id="week-todo-container">
        <div id="week-todo-subtitle-container">{renderDays()}</div>

        <div id="week-todo-container-lists">
          {weekArr.map((el, idx) => {
            return (
              <WeekTodoSubContainer pos={el} key={idx}></WeekTodoSubContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WeekPage;
