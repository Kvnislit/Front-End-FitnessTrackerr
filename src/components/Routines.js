import { fetchRoutines } from '../api';
import React, { useState, useEffect } from "react";

export default function Routines() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetchRoutines()
      .then(routines => setRoutines(routines))
      .catch(error => console.error(error));
  }, []);

  return (
    <div id="routine-container">
      <h2>({routines.length})</h2>
      <ul>
        {routines.map(routine => {
          return (
            <li key={routine.id}>
              <h2 className="routine-name" id={routine.id}>{routine.name}</h2>
              <p>{routine.goal}</p>
              <p><u>Name:</u>{routine.creatorName}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}