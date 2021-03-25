import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MonthCalendar from "./MonthCalendar";
import "../css/temporary-CSS-monthTodoContainer.css";
import "../css/temporary-CSS-for-Carousel.css";
import { js_date } from "../../utilities/index";
import { setDateSelector } from "../../actions/index";
import {
  startOfWeek,
  addDays,
  format,
  parseISO,
  startOfMonth,
  addMonths,
} from "date-fns";

function MonthPage() {
  const dispatch = useDispatch();
  const dateSelectorState = useSelector((state) => state.dateSelectorReducer);
  const { dateSelector } = dateSelectorState;

  const renderDays = () => {
    const { year, month, day } = dateSelector;
    const timeObj = parseISO(
      `${String(year).padStart(4, 0)}-${String(month).padStart(2, 0)}-${String(
        day,
      ).padStart(2, 0)}`,
    );
    const startMonthDay = startOfMonth(timeObj);

    const dateFormat = "eee";
    const days = [];

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startOfWeek(new Date()), i), dateFormat)}
        </div>,
      );
    }

    return <div className={["month-todo-days", "row"].join(" ")}>{days}</div>;
  };

  const handlePrevMonth = () => {
    const { day, month, year } = dateSelector;
    const timeObj = parseISO(
      `${String(year).padStart(4, 0)}-${String(month).padStart(2, 0)}-${String(
        day,
      ).padStart(2, 0)}`,
    );
    const startMonthDay = startOfMonth(timeObj);
    const startDay = addMonths(startMonthDay, -1);
    let [newYear, newWeek, newDay] = format(startDay, "yyyy-MM-dd").split("-");
    dispatch(setDateSelector(newYear, newWeek, newDay));
  };

  const handleNextMonth = () => {
    const { day, month, year } = dateSelector;
    const timeObj = parseISO(
      `${String(year).padStart(4, 0)}-${String(month).padStart(2, 0)}-${String(
        day,
      ).padStart(2, 0)}`,
    );
    const startMonthDay = startOfMonth(timeObj);
    const startDay = addMonths(startMonthDay, +1);
    let [newYear, newWeek, newDay] = format(startDay, "yyyy-MM-dd").split("-");
    dispatch(setDateSelector(newYear, newWeek, newDay));
  };

  return (
    <section id="month-container" className="disable-select">
      <div id="month-main">
        <button onClick={handlePrevMonth}>왼쪽</button>
        <span id="month-header">
          {format(
            parseISO(
              `${String(dateSelector.year).padStart(4, 0)}-${String(
                dateSelector.month,
              ).padStart(2, 0)}-${String(dateSelector.day).padStart(2, 0)}`,
            ),
            "yyyy",
          )}
          &nbsp;
          {format(
            parseISO(
              `${String(dateSelector.year).padStart(4, 0)}-${String(
                dateSelector.month,
              ).padStart(2, 0)}-${String(dateSelector.day).padStart(2, 0)}`,
            ),
            "MMM",
          )}
        </span>
        <button onClick={handleNextMonth}>오른쪽</button>
      </div>
      <div id="month-main-days">{renderDays()}</div>

      <MonthCalendar />
    </section>
  );
}

export default MonthPage;
