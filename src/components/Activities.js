import React, { useState, useEffect } from "react";

export const Activities = () => {
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
