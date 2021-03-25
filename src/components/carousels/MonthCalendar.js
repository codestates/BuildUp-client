import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/temporary-CSS-for-Carousel.css";
import "../css/temporary-CSS-monthTodoContainer.css";
import {
  setDateSelector,
  toggleModal,
  setModalType,
} from "../../actions/index";

import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  format,
  isSameMonth,
  addDays,
  parseISO,
} from "date-fns";

function Calendar() {
  // TODO 아래 변수를 조정하여 화면에 노출되는 최대 TODO 갯수를 조정할 수 있습니다.
  const MAX_ELEMENTS_COUNT = 3;

  const dispatch = useDispatch();

  const dateSelectorState = useSelector((state) => state.dateSelectorReducer);
  const todoItemsState = useSelector((state) => state.toDoItemsReducer);
  const { dateSelector } = dateSelectorState;
  const todoItems = todoItemsState.todoItems;

  const modalState = useSelector((state) => state.modalStateReducer);
  const modalTypeState = useSelector((state) => state.modalTypeReducer);
  const isModalOpen = modalState.modalStatus;
  const { modalType } = modalTypeState;

  const isSelectedDay = (date) => {
    date = date.split("-");
    const [year, month, day] = date;

    if (
      Number(year) === Number(dateSelector.year) &&
      Number(month) === Number(dateSelector.month) &&
      Number(day) === Number(dateSelector.day)
    )
      return true;
    return false;
  };

  const handleDateSelector = (e) => {
    // if (!e.target.dataset.date) return;
    if (!isModalOpen) dispatch(toggleModal());
    if (modalType !== "TODOMANAGER") dispatch(setModalType("TODOMANAGER"));

    const date = e.target.dataset.date.split("-");
    const [year, month, day] = date;

    dispatch(setDateSelector(year, month, day));
  };

  const renderTodo = (date) => {
    const count = {};

    const tempStore = Object.assign([], todoItems);
    tempStore.sort((a, b) => a.order - b.order);

    const sorted = tempStore.filter((el) => {
      if (el.date === date) {
        if (count[el.date] >= MAX_ELEMENTS_COUNT) return false;
        if (!count[el.date]) count[el.date] = 1;
        else count[el.date]++;
        return true;
      }
      return false;
    });

    return sorted.map((el, idx) => {
      return (
        <li
          className={[
            "disable-select",
            "month-todo-item",
            el.checked ? "checked" : "",
          ].join(" ")}
          data-date={date}
          onClick={handleDateSelector}
          key={idx}
        >
          {el.content}
        </li>
      );
    });
  };

  const renderCells = () => {
    let { year, month, day } = dateSelector;
    const timeObj = parseISO(
      `${String(year).padStart(4, 0)}-${String(month).padStart(2, 0)}-${String(
        day,
      ).padStart(2, 0)}`,
    );

    const monthStart = startOfMonth(timeObj);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const startMonth = format(monthStart, "MM");

    const rows = [];
    let days = [];
    day = startDate;
    let formattedDate = "";
    let propsDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        propsDate = format(day, "yyyy-MM-dd");
        const targetMonth = format(day, "MM");
        days.push(
          <div
            onClick={targetMonth === startMonth ? handleDateSelector : () => {}}
            data-date={propsDate}
            className={[
              "col",
              "cell",
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSelectedDay(propsDate)
                ? "selected"
                : "",
              targetMonth === startMonth ? "" : "month-disabled",
            ].join(" ")}
            key={day}
          >
            <span
              className={["number", "disable-select"].join(" ")}
              data-date={propsDate}
              onClick={handleDateSelector}
            >
              {formattedDate}
            </span>
            {renderTodo(propsDate)}
          </div>,
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>,
      );
      days = [];
    }
    return rows;
  };

  return <div id="month-todo-container">{renderCells()}</div>;
}

export default Calendar;
