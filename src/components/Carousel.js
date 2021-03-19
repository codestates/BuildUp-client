import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import DayPage from "./carousels/DayPage";
import WeekPage from "./carousels/WeekPage";
import MonthPage from "./carousels/MonthPage";
import "./temporary-CSS-for-Carousel.css";

function Carousel() {
  const items = [<DayPage />, <WeekPage />, <MonthPage />];
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState("");

  const generateItems = () => {
    const sorted = [];
    for (let i = active - 1; i <= active + 1; i++) {
      let idx = i;
      if (i < 0) idx = items.length + i;
      else if (i > items.length - 1) idx = items.length - i;
      sorted.push(items[idx]);
    }
    return sorted;
  };

  const handleMoveRight = () => {
    let newActive = active;
    --newActive < 0 ? setActive(items.length - 1) : setActive(newActive);
    setDirection("left");
  };

  const handleMoveLeft = () => {
    let newActive = active;
    ++newActive > items.length - 1 ? setActive(0) : setActive(newActive);
    setDirection("right");
  };

  return (
    <div id="carousel-container" className="left">
      <aside id="carousel-aside" className="left">
        <button className="btn-carousel" id="left" onClick={handleMoveLeft}>
          &#60;
        </button>
      </aside>
      <TransitionGroup id="carousel-item-container" transitionName={direction}>
        {generateItems()}
      </TransitionGroup>
      <aside id="carousel-aside" className="right">
        <button className="btn-carousel" id="right" onClick={handleMoveRight}>
          &#62;
        </button>
      </aside>
    </div>
  );
}

export default Carousel;
