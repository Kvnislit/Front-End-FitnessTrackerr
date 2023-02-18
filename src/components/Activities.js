import React, { useState, useEffect } from "react";
import { fetchActivities, attachActivityToRoutine } from "../api";

export default function Activities () {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities()
      .then(data => setActivities(data))
      .catch(error => console.error(error));
  }, []);

  const handleAddActivity = (activityId, count, duration) => {
    attachActivityToRoutine(routineId, activityId, count, duration, token)
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <div id="routine-details-container">
        
      <h2>Routine Activities</h2>
      <ul>
        {activities.map(activity => {
          return (
            <li key={activity.id} className="Ractivities">
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
              <p>Duration: {activity.duration}</p>
              <p>Count: {activity.count}</p>
              <button onClick={() => handleAddActivity(activity.id, 1, activity.duration)}>Add to Routine</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
