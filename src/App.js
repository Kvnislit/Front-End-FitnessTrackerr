import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Routines } from './api/routines';
import NavBar from './components/Navbar'
import { Activities } from './components/Activities';
import Register from './components/Register';
import Create from './components/Create';
import Login from './components/Login';

const App = () => {
  const [routines, setRoutines] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  const fetchRoutines = () => {
    fetch("http://fitnesstrac-kr.herokuapp.com/api/routines", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRoutines(data);
      })
      .catch((error) => console.error(error));
  };

  const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    if (token) {
      fetch("http://fitnesstrac-kr.herokuapp.com/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    exchangeTokenForUser();
    fetchRoutines();
  }, [token]);

  const logout = () =>{
    window.localStorage.removeItem('token');
    setUser({});
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Create token={token} routines={routines} setRoutines={setRoutines}/>
      <Routes>
        <Route path="/" element={<Routines />} />
        <Route path="/login" 
        element={<Login exchangeTokenForUser={exchangeTokenForUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;