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

  useEffect(() => {
    setTextarea(false);
  }, []);

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
      setAlert("?????? ??? ?????? ?????? ???????????? ?????????.");
      return;
    }
    let { year, month, day } = dateSelector;
    year = year.toString().padStart(4, "0");
    month = month.toString().padStart(2, "0");
    day = day.toString().padStart(2, "0");
    const date = `${year}-${month}-${day}`;

    // TODO: 1. ????????? ?????????????????? ????????????
    // TODO: 2. ????????? ?????????????????? ????????? ????????? ????????????.
    // if (jwt_isExpired(accessToken)) {
    //   let token = await fetch_custom.getAccessToken(accessToken);
    //   await dispatch(setAccessToken(token));
    // }

    // TODO 3. ?????? ????????? TODO??? ????????? ???????????? Primary Key??? ?????????.
    const data = { order: maxOrder + 1, content: word, now: date };
    const PK = await fetch_custom.createTodo(accessToken, data);
    // TODO 4. ??????????????? ????????? ???????????? ????????? REDUX STORE??? ????????????.

    await dispatch(
      createTodoList({ order: maxOrder + 1, content: word, date, id: PK }),
    );

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
            {dateSelector.month}??? {dateSelector.day}???
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
                setWord(e.target.value);
              }}
            ></textarea>
            <div>
              <button onClick={handleAddTodo}>??????</button>
              <button onClick={handleCancelTodo}>??????</button>
            </div>
          </>
        ) : (
          <>
            <button onClick={toggleTextarea}>????????? TODO ????????????</button>
          </>
        )}
      </div>
    </>
  );
}

export default TodoManager;
