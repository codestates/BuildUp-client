import React, { useEffect, useState } from "react";
import "../css/temporary-CSS-for-Carousel.css";
import "../css/temporary-CSS-summary.css";
import { startOfWeek, addDays, format } from "date-fns";

function Summary() {
  const [time, setTime] = useState(new Date());

  return (
    <section
      id="summary-container"
      className="disable-select summary-title-font"
    >
      <div id="summary-main-container">
        <div className="summary-item">
          <div className="header">오늘</div>
          <div className="percent">
            90<span className="mini-percent">%</span>
          </div>
          <div className="count">2 / 6</div>
          <div className="detail">
            (예시 1)조금만 더 분발해봐요! <br />
            (예시 2)오늘 해야할 일을 아직 적지 않았아요.
          </div>
        </div>
        <div className="summary-item">
          <div className="header">이번주</div>
          <div className="percent">
            75<span className="mini-percent">%</span>
          </div>
          <div className="count">18 / 24</div>
          <div className="detail">아주 잘하고 있어요!</div>
        </div>
        <div className="summary-item">
          <div className="header">이번달</div>
          <div className="percent">
            {" "}
            80<span className="mini-percent">%</span>
          </div>
          <div className="count">47 / 60</div>
          <div className="detail">
            아주 잘하고 있어요! <br />
            거의 다 왔어요! 조금만 더 힘내요.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Summary;
