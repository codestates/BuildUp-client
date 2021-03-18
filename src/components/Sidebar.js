import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
require("dotenv").config();

function Sidebar(props) {
  const history = useHistory();

  const handleRedirectToMain = () => {
    history.push("/");
  };

  return (
    <aside id="sidebar">
      <div className="logo">BuildUp</div>
      <button className="sidebar-btn-back" onClick={handleRedirectToMain}>
        메인 페이지로 돌아가기
      </button>
    </aside>
  );
}

export default Sidebar;
