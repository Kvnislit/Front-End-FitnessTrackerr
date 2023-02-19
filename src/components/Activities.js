import React, { useState, useEffect } from "react";
import { fetchActivities, attachActivityToRoutine } from "../api";

export default function Activities({ token, routineId  }) {

  console.log(token)
  console.log(routineId)
  const [count, setCount] = useState('');
  const [duration, setDuration] = useState('');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities(token)
      .then((data) => setActivities(data))
      .catch((error) => console.error(error));
  }, [token]);

  const handleAttachActivityToRoutine = (activityId) => {
  
      attachActivityToRoutine(routineId, activityId, count, duration, token)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

    console.log(activityId)
  };

  return (
    <div id="routine-details-container">
      <h2>Routine Activities</h2>
      <ul>
        {activities.map((activity) => {
          return (
            <li key={activity.name} className="Ractivities">
              <h3>{activity.id}</h3>
              <p>{activity.description}</p>
              <p>Duration: {activity.duration}</p>
              <p>Count: {activity.count}</p>
              <div>
                <input type="number" placeholder="Count" value={count} onChange={(e) => setCount(e.target.value)} />
                <input type="number" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                <button onClick={() => handleAttachActivityToRoutine(activity.id)}>Add to Routine</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
