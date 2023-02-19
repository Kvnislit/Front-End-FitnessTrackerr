import React, { useState } from "react";
import UpdateActivities from "./UpdateActivities";

export default function ActivitiesDisplay({ activities , setActivites}) {
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const handleEdit = (routineId) => {
    setSelectedRoutine(routineId);
  };

  return (
    <div id="routine-details-container">
      <h2>Routine Activities</h2>
        <UpdateActivities />
      <ul>
        {activities.map((activity) => {
          return (
            <li key={activity.id} className="Ractivities">
              <h3>Name:{activity.name}</h3>
              <p>description: {activity.description}</p>
              <button onClick={() => handleEdit(activity.routineId)}>Edit Activities</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
