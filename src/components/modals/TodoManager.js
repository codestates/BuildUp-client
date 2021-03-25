import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateSelector } from "../../actions/index";
import { js_date, jwt_isExpired, fetch_custom } from "../../utilities/index.js";
import TodoManagerListContainer from "./TodoManagerListContainer";
import { createTodoList, setAccessToken } from "../../actions/index";

function TodoManager(props) {
  const dispatch = useDispatch();
  const accessTokenState = useSelector((state) => state.accessTokenReducer);
  const accessToken = accessTokenState.accessToken;
  const dateSelectorState = useSelector((state) => state.dateSelectorReducer);
  const { dateSelector } = dateSelectorState;

  const [isTextareaActive, setTextarea] = useState("false");
  const [word, setWord] = useState("");
  const [maxOrder, setMaxorder] = useState(0);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const el = document.getElementById("todo-manager-container");
    el.scrollTo(0, 0);
  }, [dateSelector]);

  const handleDateChangerLeft = () => {
    const { year, month, day } = dateSelector;
    let [newYear, newMonth, newDay] = [year, month, day];

    let monthMinus = -1;
    if (day - 1 <= 0) {
      monthMinus = 0;
      if (month === 0) {
        newMonth = 11;
        newYear = newYear - 1;
      } else newMonth = newMonth - 1;
    }
    newDay = newDay - 1;

    const result = new Date(newYear, newMonth + monthMinus, newDay);

    dispatch(
      setDateSelector(
        js_date.getYear(result),
        js_date.getMonth(result, "number"),
        js_date.getDay(result),
      ),
    );
  };
  const handleDateChangerRight = () => {
    const { year, month, day } = dateSelector;
    const result = new Date(year, month - 1, Number(day) + 1);

    dispatch(
      setDateSelector(
        js_date.getYear(result),
        js_date.getMonth(result),
        js_date.getDay(result),
      ),
    );
  };

  const handleCancelTodo = () => {
    toggleTextarea();
    setAlert("");
  };
  const handleAddTodo = async () => {
    if (word.length === 0) {
      setAlert("최소 1자 이상 입력해야 합니다.");
      return;
    }
    let { year, month, day } = dateSelector;
    year = year.toString().padStart(4, "0");
    month = month.toString().padStart(2, "0");
    day = day.toString().padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    // TODO: 1. 토큰이 만료되었는지 확인한다
    // TODO: 2. 토큰이 만료되었으면 새로운 토큰을 요청한다.
    // if (jwt_isExpired(accessToken)) {
    //   let token = await fetch_custom.getAccessToken(accessToken);
    //   await dispatch(setAccessToken(token));
    // }

    // TODO 3. 새로 생성할 TODO를 서버에 전송하여 Primary Key를 받는다.
    const data = { order: maxOrder + 1, content: word, now: date };
    const PK = await fetch_custom.createTodo(accessToken, data);
    // TODO 4. 클라이언트 측에도 업데이트 사항을 REDUX STORE에 반영한다.

    await dispatch(
      createTodoList({ order: maxOrder + 1, content: word, date, id: PK }),
    );

    //
    setMaxorder(maxOrder + 1);
    setAlert("");
    toggleTextarea();

    const el = document.getElementById("todo-manager-container");
    el.scrollTo(0, el.scrollHeight);
  };

  const handleMaxOrder = (number) => {
    setMaxorder(number);
  };

  const handleSetAlert = (text) => {
    setAlert(text);
  };
  const toggleTextarea = () => {
    setTextarea(!isTextareaActive);
  };
  return (
    <>
      <div id="modal-header">
        <div id="modal-header-daySelector">
          <button onClick={handleDateChangerLeft}>&#60;</button>
          <span>
            {dateSelector.month}월 {dateSelector.day}일
          </span>
          <button onClick={handleDateChangerRight}>&#62;</button>
        </div>
      </div>
      <div id="modal-section">
        <TodoManagerListContainer
          handleMaxOrder={handleMaxOrder}
          handleSetAlert={handleSetAlert}
        />
      </div>
      {/* Footer */}
      <div id="modal-footer">
        <div id="alert">{alert}</div>
        {!isTextareaActive ? (
          <>
            <textarea
              maxLength="100"
              onChange={(e) => {
                console.log(e.target.value);
                setWord(e.target.value);
              }}
            ></textarea>
            <div>
              <button onClick={handleAddTodo}>확인</button>
              <button onClick={handleCancelTodo}>취소</button>
            </div>
          </>
        ) : (
          <>
            <button onClick={toggleTextarea}>새로운 TODO 작성하기</button>
          </>
        )}
      </div>
    </>
  );
}

export default TodoManager;
