import React, { useState } from "react";
import DayPage from "./carousels/DayPage";
import WeekPage from "./carousels/WeekPage";
import MonthPage from "./carousels/MonthPage";
import "./css/temporary-CSS-for-Carousel.css";

function Carousel() {
  const [pos, setPos] = useState(0);
  const [direction, setDirection] = useState("");
  const [isValid, setValid] = useState(true);
  const items = [<DayPage />, <WeekPage />, <MonthPage />];
  let container = [];

  const containerHandler = (items) => {
    const sorted = [];
    for (let i = pos - 1; i <= pos + 1; i++) {
      let idx = i;
      if (i < 0) idx = items.length + i;
      else if (i > items.length - 1) idx = i - items.length;

      const item = (
        <div className={["carousel-child", direction].join(" ")}>
          {items[idx]}
        </div>
      );
      sorted.push(item);
    }
    container = sorted;
  };

  const handleMoveLeft = () => {
    if (!isValid) return;
    setValid(false);
    setDirection("left");
    containerHandler(items);

    setTimeout(() => {
      let newPos = pos;
      --newPos < 0 ? setPos(items.length - 1) : setPos(newPos);
      setDirection("");
      containerHandler(items);
      setTimeout(() => {
        setValid(true);
      }, 100);
    }, 1000);
  };

  const handleMoveRight = () => {
    if (!isValid) return;
    setValid(false);
    setDirection("right");
    containerHandler(items);

    setTimeout(() => {
      let newPos = pos;
      ++newPos > items.length - 1 ? setPos(0) : setPos(newPos);
      setDirection("");
      containerHandler(items);
      setTimeout(() => {
        setValid(true);
      }, 100);
    }, 1000);
  };

  containerHandler(items);

  return (
    <div id="carousel-container" className="left">
      <aside id="carousel-aside" className="left ">
        <button
          className="btn-carousel aside-btn-box"
          id="left"
          onClick={handleMoveLeft}
        >
          &#60;
        </button>
      </aside>
      <div id="carousel-item-container">{container}</div>
      <aside id="carousel-aside" className="right ">
        <button
          className="btn-carousel aside-btn-box"
          id="right"
          onClick={handleMoveRight}
        >
          &#62;
        </button>
      </aside>
    </div>
  );
}

export default Carousel;
