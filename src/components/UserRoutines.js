import React, { useState, useEffect } from 'react';
import { fetchAllPublicRoutinesForAUser } from '../api';

export default function UserRoutines({ token, user }) {
  const [publicRoutines, setPublicRoutines] = useState([]);

useEffect(() => {
  if (user) {
    fetchAllPublicRoutinesForAUser(user.username)
      .then(data => setPublicRoutines(data.filter(routine => routine.creatorId === user.id)))
      .catch(error => console.error(error));
  }
}, [token, user]);

  // Check if user exists before rendering
  if (!user) {
    return null;
  }

  return (
    <div id="user-routines-container">
      <h2>{`Public Routines for User ${user.username}`}</h2>
      <ul>
        {publicRoutines.map(routine => (
          <li key={routine.id}>
            <h3>{routine.name}</h3>
            <p>{routine.goal}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}