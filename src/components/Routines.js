import { fetchRoutines } from '../api';
import React, { useState, useEffect } from "react";
import { CreateRoutines, UpdateRoutines} from '../components';


export default function Routines({token}) {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetchRoutines()
      .then(routines => setRoutines(routines))
      .catch(error => console.error(error));
  }, []);

  return (
    <div id="routine-container">
        <title>Routines</title>
        <CreateRoutines token={token} setRoutines={setRoutines} />
      <UpdateRoutines routines={routines} setRoutines={setRoutines} />
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