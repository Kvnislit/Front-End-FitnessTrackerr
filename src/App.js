import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Activities,
  Home,
  Login,
  NavBar,
  Register,
  Routines,
  UpdateRoutines,
  UserRoutines,
 UpdateActivities
} from "./components";
import { fetchActivities, fetchAllRoutines, exchangeTokenForUser, fetchUserId, fetchActivityIds } from "./api";


const App = () => {
  const [routines, setRoutines] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(null);
  const [activityId, setActivityId] = useState(null);

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
      .then((activityIds) => {
        const ids = activityIds.map((activity) => activity.id);
        setActivityId(ids);
      })
      .catch((error) => console.error("Failed to fetch activity ids:", error));
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setUser({});
  };

  return (
    <BrowserRouter>
      <NavBar user={user} logout={handleLogout} />
      <Routes>
      <Route path="/UpdateActivities" element={<UpdateActivities fetchActivityIds={fetchActivityIds} activityId={activityId} user={user} token={token} activities={activities} setActivities={setActivities} routines={routines} setRoutines={setRoutines} />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login exchangeTokenForUser={exchangeTokenForUser} setUser={setUser} setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/routines" element={<Routines token={token} routines={routines} setRoutines={setRoutines} activities={activities} setActivities={setActivities} />} />
        <Route path="/Activities" element={<Activities token={token} activities={activities} setActivities={setActivities} routines={routines} setRoutines={setRoutines} UpdateActivities={UpdateActivities}/>} />
        <Route path="/UserRoutine" element={<UserRoutines  token={token} routines={routines} setRoutines={setRoutines} user={user} />}/>
        <Route path="/UpdateRoutines" element={<UpdateRoutines routines={routines} setRoutines={setRoutines} user={user} token={token}  />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
