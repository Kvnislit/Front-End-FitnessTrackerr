import React, { useState, useEffect } from 'react';

export const Routines = () => {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    fetch('http://fitnesstrac-kr.herokuapp.com/api/routines')
      .then(response => response.json())
      .then(routines => setRoutines(routines));
  }, []);


  return (
    <div id="routine-container">
        <title>Routines</title>
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