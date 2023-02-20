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
      <ul>
      <title>{`Routines for ${user.username}`}</title>
        {myRoutines.map((routine) => (
          <li key={routine.id}>
            <h2>Name:{routine.name}</h2>
            <h2>Goal:{routine.goal}</h2>
            <h2>Activities:{routine.activities}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}