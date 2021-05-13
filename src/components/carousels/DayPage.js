import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/temporary-CSS-for-Carousel.css";
import DayTodoItemList from "./DayTodoContainer";
import { js_date, jwt_isExpired, fetch_custom } from "../../utilities/index.js";
import { createTodoList, setAccessToken } from "../../actions/index";
import { format } from "date-fns";

function DayPage() {
  const dispatch = useDispatch();

  const [time, setTime] = useState(new Date());
  const [maxOrder, setMaxOrder] = useState(0);
  const [isTextareaActive, setTextareaActive] = useState(false);
  const [word, setWord] = useState("");
  const [alert, setAlert] = useState("");

  const accessTokenState = useSelector((state) => state.accessTokenReducer);
  const accessToken = accessTokenState.accessToken;

  const handleToggleTextarea = () => {
    setTextareaActive(!isTextareaActive);
    setWord("");
    setAlert("");
  };

  const handleAddTodo = async () => {
    if (word.length === 0) {
      setAlert("최소 한 글자 이상 입력해야 합니다.");
      return;
    }
    let date = format(time, "yyyy-MM-dd").split("-");
    const year = date[0].padStart(4, "0");
    const month = date[1].padStart(2, "0");
    const day = date[2].padStart(2, "0");

    date = `${year}-${month}-${day}`;

    // TODO: 1. 토큰이 만료되었는지 확인한다
    // TODO: 2. 토큰이 만료되었으면 새로운 토큰을 요청한다.
    if (jwt_isExpired(accessToken)) {
      let token = await new Promise((resolve, reject) =>
        fetch_custom.getAccessToken(accessToken),
      );
      // let token = await fetch_custom.getAccessToken(accessToken);
      await dispatch(setAccessToken(token));
    }

    // TODO 3. 새로 생성할 TODO를 서버에 전송하여 Primary Key를 받는다.
    const data = { order: maxOrder + 1, content: word, now: date };
    const PK = await fetch_custom.createTodo(accessToken, data);
    // TODO 4. 클라이언트 측에도 업데이트 사항을 REDUX STORE에 반영한다.

    await dispatch(
      createTodoList({ order: maxOrder + 1, content: word, date, id: PK }),
    );

    setMaxOrder(maxOrder + 1);
    handleToggleTextarea();

    const el = document.getElementsByClassName("day-todo-container-ul")[0];
    el.scrollTo(0, el.scrollHeight);
    setAlert("");
    setWord("");
  };

  const handleUpdateText = (e) => {
    setWord(e.target.value);
  };

  const handleMaxOrder = (number) => {
    setMaxOrder(number);
  };

  return (
    <section id="day-container">
      <header id="day-main">
        <span id="day-title">
          {js_date.getMonth(time)}. {js_date.getDay(time)}.{" "}
          {js_date.getLabel(time).toLowerCase()}
        </span>
      </header>
      <section id="day-todo-container">
        <div id="day-button-container">
          {isTextareaActive ? (
            <>
              <textarea
                className="day-textarea"
                maxLength="100"
                onChange={handleUpdateText}
              ></textarea>
              <button
                className="day-btn-confirm-cancel"
                onClick={handleAddTodo}
              >
                확인
              </button>
              <button
                className="day-btn-confirm-cancel"
                onClick={handleToggleTextarea}
              >
                취소
              </button>
            </>
          ) : (
            <button className="day-btn-add-todo" onClick={handleToggleTextarea}>
              새로운 TODO 작성하기
            </button>
          )}
        </div>
        <div id="alert">{alert}</div>

        <DayTodoItemList pos={time} handleMaxOrder={handleMaxOrder} />
      </section>
    </section>
  );
}

export default DayPage;
