import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
require("dotenv").config();

function Sidebar(props) {
  const history = useHistory();

  const handleRedirectToMain = () => {
    history.push("/");
  };

  return (
    <div id="sidebar">
      <div
        id="header-name"
        className="sidebar-header-name"
        onClick={handleRedirectToMain}
      >
        <span>Build Up</span>
      </div>
      <button className="sidebar-btn-back" onClick={handleRedirectToMain}>
        메인 페이지로 돌아가기
      </button>
    </div>
  );
}

export default Sidebar;
