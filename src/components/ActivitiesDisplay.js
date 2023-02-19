import React, { useState, useEffect } from "react";
import { UpdateActivities, CreateActivity } from '../components';
import { fetchActivityIds } from "../api";

export default function ActivitiesDisplay({ token , activities, setActivities }) {
  const [activityIds, setActivityIds] = useState([]);
  
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetchActivityIds(token)
      .then((ids) => setActivityIds(ids))
      .catch((error) => console.error('Failed to fetch activity IDs:', error));
  }, []);

  const handleEdit = (activityId) => {
    setActivityIds(activityId);
  };

  return (
    <div id="routine-details-container">
      <title>Activities</title>
      <CreateActivity token={token}/>
      <UpdateActivities token={token} activityIds={activityIds} setActivities={setActivities} />
      <ul>
        {activities.map((activity) => {
          return (
            <li key={activity.id} className="Ractivities">
              <h3>Name:{activity.name}</h3>
              <p>description: {activity.description}</p>
              <button onClick={() => handleEdit(activity.id)}>
                Edit
              </button>
              <button>
                Add
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
