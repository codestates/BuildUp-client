import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/temporary-CSS-for-Carousel.css";
import { js_date } from "../../utilities/index.js";
import {
  toggleModal,
  setModalType,
  setDateSelector,
} from "../../actions/index";
import "../css/temporary-CSS-weekTodoContainer.css";
import { format } from "date-fns";

function WeekTodoSubContainer(props) {
  // TODO 아래 변수를 조정하여 화면에 노출되는 최대 TODO 갯수를 조정할 수 있습니다.
  const MAX_ELEMENTS_COUNT = 8;

  const dispatch = useDispatch();
  const [time, setTime] = useState(props.pos);
  const [lists, setLists] = useState([]);

  const todoItemsState = useSelector((state) => state.toDoItemsReducer);
  const todoItems = todoItemsState.todoItems;

  const modalState = useSelector((state) => state.modalStateReducer);
  const modalTypeState = useSelector((state) => state.modalTypeReducer);
  const dateSelectorState = useSelector((state) => state.dateSelectorReducer);
  const isModalOpen = modalState.modalStatus;
  const { modalType } = modalTypeState;
  const { year, month, day } = dateSelectorState;

  useEffect(() => {
    const [year, month, day] = [
      js_date.getYear(time),
      js_date.getMonth(time),
      js_date.getDay(time),
    ];
    const curPos = `${year}-${month}-${day}`;

    const count = {};

    const tempStore = Object.assign([], todoItems);
    tempStore.sort((a, b) => a.order - b.order);

    const sorted = tempStore.filter((el) => {
      if (el.date === curPos) {
        if (count[el.date] >= MAX_ELEMENTS_COUNT) return false;
        if (!count[el.date]) count[el.date] = 1;
        else count[el.date]++;
        return true;
      }
      return false;
    });
    setLists(sorted);
  }, [time, todoItems]);

  const handleModalTodoManager = () => {
    if (!isModalOpen) dispatch(toggleModal());
    if (modalType !== "TODOMANAGER") dispatch(setModalType("TODOMANAGER"));

    let [newYear, newMonth, newDay] = [
      js_date.getYear(time),
      js_date.getMonth(time),
      js_date.getDay(time),
    ];

    if (newYear === year && newMonth === month && newDay === day) return;
    dispatch(setDateSelector(newYear, newMonth, newDay));
  };

  const isSelectedDay = (time) => {
    let date = dateSelectorState.dateSelector;
    let curYear = date.year;
    let curMonth = date.month;
    let curDay = date.day;

    const dataFormat = "yyyy-MM-dd";
    date = format(time, dataFormat);
    date = date.split("-");
    const [year, month, day] = date;

    if (
      curYear === Number(year) &&
      curMonth === Number(month) &&
      curDay === Number(day)
    )
      return true;
    return false;
  };

  return (
    <div
      className={[
        "week-todo-subcontainer",
        isSelectedDay(time) ? "selected" : "",
      ].join(" ")}
      key="idx"
      onClick={handleModalTodoManager}
    >
      {lists.map((el, idx) => {
        return (
          <div className="week-todo-subcontainer-item">
            <li
              key={`${el.id}`}
              data-order={`${el.order}`}
              className={el.checked ? "checked" : ""}
            >
              {el.content}
            </li>
          </div>
        );
      })}
    </div>
  );
}

export default WeekTodoSubContainer;
