import React, { useState } from "react";
import MonthCalendar from "./MonthCalendar";
import "../css/temporary-CSS-monthTodoContainer.css";
import "../css/temporary-CSS-for-Carousel.css";
import { js_date } from "../../utilities/index";
import { startOfWeek, addDays, format } from "date-fns";

function MonthPage() {
  const [time, setTime] = useState(new Date());

  const renderDays = () => {
    const dateFormat = "eee";
    const days = [];
    let startDate = startOfWeek(new Date());

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>,
      );
    }

    return <div className={["month-todo-days", "row"].join(" ")}>{days}</div>;
  };

  return (
    <section id="month-container" className="disable-select">
      <div id="month-main">
        <span id="month-header">{js_date.getMonth(time, "label")}</span>
      </div>
      <div id="month-main-days">{renderDays()}</div>

      <MonthCalendar />
    </section>
  );
}

export default MonthPage;
