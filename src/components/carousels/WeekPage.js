import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../css/temporary-CSS-for-Carousel.css";
import WeekTodoSubContainer from "./WeekTodoSubContainer";
import "../css/temporary-CSS-weekTodoContainer.css";
import { setDateSelector } from "../../actions/index";
import {
  startOfWeek,
  addDays,
  addWeeks,
  format,
  parseISO,
  getWeekOfMonth,
} from "date-fns";

function WeekPage() {
  const dispatch = useDispatch();
  const [weekArr, setWeekArr] = useState([]);

  const dateSelectorState = useSelector((state) => state.dateSelectorReducer);
  const { dateSelector } = dateSelectorState;

  useEffect(() => {
    const { day, month, year } = dateSelector;
    const timeObj = parseISO(
      `${String(year).padStart(4, 0)}-${String(month).padStart(2, 0)}-${String(
        day,
      ).padStart(2, 0)}`,
    );
    const startWeekDay = startOfWeek(timeObj);

    const sorted = [];

    for (let i = 0; i < 7; i++) {
      const pos = addDays(startWeekDay, i);
      sorted.push(pos);
    }
    setWeekArr(sorted);
  }, [dateSelector]);

  const renderDays = () => {
    if (weekArr.length === 0) return;
    const dateFormat = "MM. dd. eee";
    const days = [];
    let startDate = startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="week-todo-subtitle" key={i}>
          {format(weekArr[i], dateFormat)}
        </div>,
      );
    }
    return days;
  };

  const handlePrevWeek = () => {
    const { day, month, year } = dateSelector;
    const timeObj = parseISO(
      `${String(year).padStart(4, 0)}-${String(month).padStart(2, 0)}-${String(
        day,
      ).padStart(2, 0)}`,
    );
    const startWeekDay = startOfWeek(timeObj);
    const startDay = addWeeks(startWeekDay, -1);
    let [newYear, newWeek, newDay] = format(startDay, "yyyy-MM-dd").split("-");
    dispatch(setDateSelector(newYear, newWeek, newDay));
  };

  const handleNextWeek = () => {
    const { day, month, year } = dateSelector;
    const timeObj = parseISO(
      `${String(year).padStart(4, 0)}-${String(month).padStart(2, 0)}-${String(
        day,
      ).padStart(2, 0)}`,
    );
    const startWeekDay = startOfWeek(timeObj);
    const startDay = addWeeks(startWeekDay, 1);
    let [newYear, newWeek, newDay] = format(startDay, "yyyy-MM-dd").split("-");
    dispatch(setDateSelector(newYear, newWeek, newDay));
  };

  const getWeekNumber = () => {
    function ordinal_suffix_of(i) {
      var j = i % 10,
        k = i % 100;
      if (j == 1 && k != 11) {
        return i + "st";
      }
      if (j == 2 && k != 12) {
        return i + "nd";
      }
      if (j == 3 && k != 13) {
        return i + "rd";
      }
      return i + "th";
    }

    let weekNum = getWeekOfMonth(
      parseISO(
        `${String(dateSelector.year).padStart(4, 0)}-${String(
          dateSelector.month,
        ).padStart(2, 0)}-${String(dateSelector.day).padStart(2, 0)}`,
      ),
    );

    return ordinal_suffix_of(weekNum);
  };

  return (
    <section id="week-container" className="disable-select week-title-font">
      <div id="week-main-title">
        <button onClick={handlePrevWeek} className="left-btn week-left-btn">
          &#60;
        </button>

        <span id="week-title" className="week-title-font">
          {/* {getWeekNumber()} */}
          {/* &nbsp;  */}
          Week
        </span>

        <button onClick={handleNextWeek} className="right-btn week-right-btn">
          &#62;
        </button>
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
