import React, { useState, useEffect } from "react";
import { loginUser } from "../api/index";
import Register from "./Register";

const Login = (props) => {
  const exchangeTokenForUser = props.exchangeTokenForUser;
  const setToken = props.setToken
  const setUser = props.setUser
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = (ev) => {
    ev.preventDefault();
    loginUser(loginUsername, loginPassword)
      .then((token) => {
        exchangeTokenForUser(setToken, setUser);
        fetch("http://fitnesstrac-kr.herokuapp.com/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <form className="LoginBox" onSubmit={login}>
      <h1 className="LoginIn">Login</h1>
      <input
      className="LoginIn"
        placeholder="username"
        value={loginUsername}
        onChange={(ev) => setLoginUsername(ev.target.value)}
      />

      <input
      className="LoginIn"
        type="password"
        value={loginPassword}
        onChange={(ev) => setLoginPassword(ev.target.value)}
      />

      <button className="LoginIn">Login</button>
      <div>
      </div>
    </form>
    
      
    
  );
};

export default Login;