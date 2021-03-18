import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

function SignUp(props) {
  return (
    <>
      <div id="modal-header">
        <span></span>
        <button onClick={props.handleModalToggle}>X</button>
      </div>
      <div id="modal-section">
        <div>
          <span>Username</span>
          <input type="text"></input>
        </div>
        <div>
          <span>Email</span>
          <input type="text"></input>
        </div>
        <div>
          <span>Confirm Email</span>
          <input type="text"></input>
        </div>
        <div>
          <span>Password</span>
          <input type="password"></input>
        </div>
        <div>
          <span>Password</span>
          <input type="password"></input>
        </div>
      </div>
      <div id="modal-footer">
        <button>확인</button>
      </div>
    </>
  );
}

export default SignUp;
