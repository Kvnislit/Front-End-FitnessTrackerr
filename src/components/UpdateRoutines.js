import React, { useState } from 'react';

const UpdateRoutines = ({  routines, setRoutines, routineId, setRoutineId }) => {
  const [goal, setGoal] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: name,
        goal: goal,
      })
    });
    const data = await response.json();
    if (data && data.name && data.goal) {
      const newRoutine = routines.map(routine => {
        if (routine.id === routineId) {
          return data;
        } else {
          return routine;
        }
      });
      setRoutines(newRoutine)
      setName('')
      setGoal('');
      setRoutineId(null)
    }
  }

  return (
    <form className='update' onSubmit={handleSubmit}>
      <h2>Edit Routine</h2>
      <input
        type="text"
        placeholder="edit name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <input
        type="text"
        placeholder="edit goal"
        value={goal}
        onChange={(ev) => setGoal(ev.target.value)}
      />
      <button type="submit" className="btn btn-outline-primary">Submit</button>
    </form>
  );
};

export default UpdateRoutines;