import React, { useState, useEffect } from "react";

const Login = (props) => {
    const exchangeTokenForUser = props.exchangeTokenForUser
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");


  const login = (ev) => {
    ev.preventDefault();
    fetch("http://fitnesstrac-kr.herokuapp.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        window.localStorage.setItem("token", token);
        exchangeTokenForUser();
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
      <h3>Login</h3>
      <input
        placeholder="username"
        value={loginUsername}
        onChange={(ev) => setLoginUsername(ev.target.value)}
      />

      <input
        type="password"
        value={loginPassword}
        onChange={(ev) => setLoginPassword(ev.target.value)}
      />

      <button>Login</button>
    </form>
  );
};

export default Login;