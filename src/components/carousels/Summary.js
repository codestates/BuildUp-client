import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/temporary-CSS-for-Carousel.css";
import "../css/temporary-CSS-summary.css";
import {
  startOfWeek,
  startOfMonth,
  startOfYear,
  format,
  parseJSON,
  setDay,
  set,
} from "date-fns";

function Summary() {
  const todoItemsState = useSelector((state) => state.toDoItemsReducer);
  const todoItems = todoItemsState.todoItems;

  const [dayTotal, setDayTotal] = useState(0);
  const [dayChecked, setDayChecked] = useState(0);
  const [weekTotal, setWeekTotal] = useState(0);
  const [weekChecked, setWeekChecked] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);
  const [monthChecked, setMonthChecked] = useState(0);

  const getTimeStatics = () => {
    const time = new Date();

    const curDay = format(time, "yyyy-MM-dd");
    const curStartOfWeek = format(startOfWeek(time), "yyyy-MM-dd");
    const curStartOfMonth = format(startOfMonth(time), "yyyy-MM-dd");

    let counter = {
      dayTotal: 0,
      dayChecked: 0,
      weekTotal: 0,
      weekChecked: 0,
      monthTotal: 0,
      monthChecked: 0,
    };

    for (let i = 0; i < todoItems.length; i++) {
      // TODO: items의 시간을 TIME 객체로 변환한다.
      const item = todoItems[i];
      let date = item.date.split("-");
      date = new Date(date[0], Number(date[1]) - 1, date[2]);

      // TODO: 일 / 소속 주의 시작일 / 소속 월의 시작일이 동일한지 확인한다
      const itemDay = format(date, "yyyy-MM-dd");
      const itemStartOfWeek = format(startOfWeek(date), "yyyy-MM-dd");
      const itemStartOfMonth = format(startOfMonth(date), "yyyy-MM-dd");

      if (curDay === itemDay) {
        counter.dayTotal++;
        if (item.checked) counter.dayChecked++;
      }
      if (curStartOfWeek === itemStartOfWeek) {
        counter.weekTotal++;
        if (item.checked) counter.weekChecked++;
      }
      if (curStartOfMonth === itemStartOfMonth) {
        counter.monthTotal++;
        if (item.checked) counter.monthChecked++;
      }
    }

    setDayTotal(counter.dayTotal);
    setDayChecked(counter.dayChecked);
    setWeekTotal(counter.weekTotal);
    setWeekChecked(counter.weekChecked);
    setMonthTotal(counter.monthTotal);
    setMonthChecked(counter.monthChecked);
  };

  useEffect(() => {
    if (todoItems.length > 0) {
      getTimeStatics();
    }
  }, [todoItems]);

  const getPercent = (numer, denom) => {
    if (denom === 0) return "X";
    return Math.floor((numer / denom) * 100);
  };

  const getUnits = (denom) => {
    if (denom === 0) return "";
    return "%";
  };

  const getMessage = (numer, denom, text) => {
    if (denom === 0) return `${text} 해야할 일을 적지 않았어요.`;
    if (numer / denom < 0.33) return `아직은 더 분발해야겠어요.`;
    if (numer / denom < 0.66) return `아주 잘하고 있어요!`;
    if (numer / denom < 1) return `거의 다 왔어요. 조금만 더 힘내요!`;
    if (numer / denom === 1) return `축하해요! ${text} 할 일을 모두 마쳤어요.`;
  };

  return (
    <section
      id="summary-container"
      className="disable-select summary-title-font"
    >
      <div id="summary-main-container">
        <article className="summary-item">
          <div className="header">오늘</div>
          <div className="percent">
            {getPercent(dayChecked, dayTotal)}
            <span className="mini-percent">{getUnits(dayTotal)}</span>
          </div>
          <div className="count">
            {dayChecked} / {dayTotal}
          </div>
          <div className="detail">
            {getMessage(dayChecked, dayTotal, "오늘")}
          </div>
        </article>
        <article className="summary-item">
          <div className="header">이번주</div>
          <div className="percent">
            {getPercent(weekChecked, weekTotal)}
            <span className="mini-percent">{getUnits(weekTotal)}</span>
          </div>
          <div className="count">
            {weekChecked} / {weekTotal}
          </div>
          <div className="detail">
            {getMessage(weekChecked, weekTotal, "이번주")}
          </div>
        </article>
        <article className="summary-item">
          <div className="header">이번달</div>
          <div className="percent">
            {" "}
            {getPercent(monthChecked, monthTotal)}
            <span className="mini-percent">{getUnits(monthTotal)}</span>
          </div>
          <div className="count">
            {monthChecked} / {monthTotal}
          </div>
          <div className="detail">
            {getMessage(monthChecked, monthTotal, "이번달")}
          </div>
        </article>
      </div>
    </section>
  );
}

export default Summary;
