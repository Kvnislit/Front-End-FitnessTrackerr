import React, { useState, useEffect } from 'react';
import { fetchAllPublicRoutinesForAUser } from '../api';

export default function UserRoutines({ token, user, activities }) {
  const [myRoutines, setMyRoutines] = useState([]);

useEffect(() => {
  if (user) {
    fetchAllPublicRoutinesForAUser(user.username)
      .then(data => setMyRoutines(data.filter(routine => routine.creatorId === user.id)))
      .catch(error => console.error(error));
  }
}, [token, user]);


  if (!user) {
    return null;
  }
console.log(user)
  return (
    <div id="user-routines-container">
      <h2>{`Public Routines for User ${user.username}`}</h2>
      <ul>
        {myRoutines.map((routine) => (
          <li key={routine.id}>
            <h3>Name:{routine.name}</h3>
            <p>Goal:{routine.goal}</p>
            <p>Activities:{routine.activities}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}