import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { js_date } from "../../utilities/index";
import "../css/temporary-CSS-for-Carousel.css";

function Calendar() {
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
  };

  return (
    <div id="month-todo-container">
      <li key="1" order="1">
        <button>X</button>
        <span>오늘 나는 잠을 잘 잤다.</span>
      </li>
      <li key="2" order="2">
        <button>X</button>
        <span>오늘 나는 잠을 잘 잤다.</span>
      </li>
      <li key="3" order="3">
        <button>X</button>
        <span>오늘 나는 잠을 잘 잤다.</span>
      </li>
      <li key="4" order="4">
        <button>X</button>
        <span>오늘 나는 잠을 잘 잤다.</span>
      </li>
    </div>
  );
}

export default Calendar;
