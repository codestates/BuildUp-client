import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../temporary-CSS-for-Carousel.css";
import { js_date } from "../../utilities/index.js";
import {
  toggleModal,
  setModalType,
  setDateSelector,
} from "../../actions/index";
import "./temporary-CSS-weekTodoContainer.css";

function WeekTodoSubContainer(props) {
  // TODO 아래 변수를 조정하여 화면에 노출되는 최대 TODO 갯수를 조정할 수 있습니다.
  const MAX_ELEMENTS_COUNT = 5;

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

    const sorted = todoItems.filter((el) => {
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

  return (
    <div
      className="week-todo-subcontainer"
      key="idx"
      onClick={handleModalTodoManager}
    >
      <div className="week-todo-subtitle">
        {js_date.getMonth(props.pos)}. {js_date.getDay(props.pos)}.{" "}
        {js_date.getLabel(props.pos)}
      </div>
      {lists.map((el, idx) => {
        return (
          <div className="week-todo-subcontainer-item">
            <input type="checkbox" />
            <li key={`${el.id}`} data-order={`${el.order}`}>
              {el.content}
            </li>
          </div>
        );
      })}
    </div>
  );
}

export default WeekTodoSubContainer;
