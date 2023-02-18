import React, { useState } from 'react';

const UpdateRoutines = ({ routines, setRoutines, token, user, routineId, setRoutineId, handleDelete }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log('name, goal:', name, goal);
        console.log('routineId:', routineId);
    const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        goal: goal,
        isPublic: null
      })
    });
    if (!response.ok) {
      throw new Error(`Failed to update routine: ${response.status}`);
    }
    const data = await response.json();
    console.log('data:', data);
    if(data && data.name, data.goal){
    const newRoutine = routines.map(routine => {
      if (routine.id === routineId) {
        return data;
      } else {
        return routine;
      }
    });
  
    setRoutines(newRoutine);
    setRoutineId(null);
    setName('');
    setGoal('');
  };
  }

  return <>
    <form className="update" onSubmit={handleSubmit}>
      <h2>Edit Routine</h2>
      <input type="text" placeholder="edit name" value={name} onChange={(ev) => setName(ev.target.value)} />
      <input type="text" placeholder="edit goal" value={goal} onChange={(ev) => setGoal(ev.target.value)} />
      <button type="submit" className="btn btn-outline-primary">
        Submit
      </button>
    </form>
  </>
};

export default UpdateRoutines;