import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  NavBar,
  Register,
  Routines,
  UpdateRoutines,
  UserRoutines,
  UpdateActivities,
  ActivitiesDisplay,
  CreateActivity
} from "./components";
import { fetchActivities, fetchAllRoutines, exchangeTokenForUser, fetchUserId,  } from "./api";

const App = () => {
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);
    if (token) {
      exchangeTokenForUser(setToken, setUser);
    }

    fetchAllRoutines(token)
      .then((routines) => setRoutines(routines))
      .catch((error) => console.error("Failed to fetch routines:", error));

    fetchActivities(token)
      .then((activities) => setActivities(activities))
      .catch((error) => console.error("Failed to fetch activities:", error));

      fetchUserId(token)
      .then((userId) => {
        if (userId && userId[0]) {
          setUserId(userId[0].id);
        }
      })
  }, []);


  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setUser({});
  };
  const handleAddRoutine = (newRoutine) => {
    setRoutines((routines) => [newRoutine, ...routines]);
  };
  return (
    <BrowserRouter>
      <NavBar user={user} logout={handleLogout} />
      <Routes>
      <Route path="/UpdateActivities" element={<UpdateActivities user={user} token={token} activities={activities} setActivities={setActivities} routines={routines} setRoutines={setRoutines} />} />
      <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/CreateActivity" handleAddRoutine={handleAddRoutine}element={<CreateActivity token={token} />} />
        <Route path="/Login" element={<Login exchangeTokenForUser={exchangeTokenForUser} setUser={setUser} setToken={setToken} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Routines" element={<Routines userId={userId} token={token} routines={routines} setRoutines={setRoutines} activities={activities} setActivities={setActivities} />} />
        <Route path="/Activities" element={<ActivitiesDisplay token={token} activities={activities} setActivities={setActivities} routines={routines} setRoutines={setRoutines}/>} />
        <Route path="/UserRoutine" element={<UserRoutines  token={token} routines={routines} setRoutines={setRoutines} user={user} />}/>
        <Route path="/UpdateRoutines" element={<UpdateRoutines routines={routines} setRoutines={setRoutines} userId={userId} user={user} token={token}  />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;