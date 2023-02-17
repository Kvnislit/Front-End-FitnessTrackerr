import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  // Activities,
  CreateRoutines,
  Home,
  Login,
  NavBar,
  Register,
  Routines,
  UpdateRoutines,
} from "./components";
import { fetchActivities, fetchRoutines, exchangeTokenForUser } from "./api";

const App = () => {
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    if (token) {
      exchangeTokenForUser(setToken, setUser);
    }

    fetchRoutines(token)
      .then((routines) => setRoutines(routines))
      .catch((error) => console.error("Failed to fetch routines:", error));

    fetchActivities(token)
      .then((activities) => setActivities(activities))
      .catch((error) => console.error("Failed to fetch activities:", error));
  }, []);


  const handleLogout = () => {
    window.localStorage.removeItem('token');
    setUser({});
  }

  return (
    <BrowserRouter>
      <NavBar user={user} logout={handleLogout} />
      <CreateRoutines token={token} setRoutines={setRoutines}/>
      <UpdateRoutines/>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login exchangeTokenForUser={exchangeTokenForUser} setUser={setUser} setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/routines" element={<Routines />} />
        {/* <Route path="/activities" element={<Activities />} /> */}
        <Route path="/UpdateRoutines" element={<UpdateRoutines routines={routines} setRoutines={setRoutines} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
