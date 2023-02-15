import React, { useState, useEffect } from 'react';

export const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetch('http://fitnesstrac-kr.herokuapp.com/api/routines')
      .then(response => response.json())
      .then(routines => setRoutines(routines));
  }, []);

  // const routineTitle = (id) => {
  //   window.location.href = `/details`;
  // };

  return (
    <div id="routine-container">
        <title>Routines</title>
      <h2>({routines.length})</h2>
      <ul>
        {routines.map(routine => {
          return (
            <li key={routine.id}>
              <h2 className="routine-name" onClick={() => routineTitle(routine.id)}>{routine.name}</h2>
              <p>{routine.goal}</p>
              <p><u>Name:</u>{routine.creatorName}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const RoutineDetails = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities`)
      .then(response => response.json())
      .then(activities => setActivities(activities));
  }, []);

  return (
    <div id="routine-details-container">
        
      <h2>Routine Activities</h2>
      <ul>
        {activities.map(activity => {
          return (
            <li key={activity.id}>
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
              <p>Duration: {activity.duration}</p>
              <p>Count: {activity.count}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
 
