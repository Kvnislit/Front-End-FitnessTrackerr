import React, { useState, useEffect } from "react";
import { fetchActivities } from "../api";

export const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities()
      .then(data => setActivities(data))
      .catch(error => console.error(error));
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
