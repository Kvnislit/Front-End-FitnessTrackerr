import React, { useState } from 'react';
import { postRoutine, fetchAllRoutines } from '../api';

const CreateRoutine = ({ token , setRoutines }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmitForRoutines = async (ev) => {
    ev.preventDefault();
    try {
      const data = await postRoutine(token, name, goal);
      console.log('data:', data);
      const routines = await fetchAllRoutines();
      setRoutines(routines);
      setName('');
      setGoal('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className='update' onSubmit={handleSubmitForRoutines}>
      <h2>Create Routine</h2>
      <input
        className="input-btn"
        type='text'
        placeholder='edit name'
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <input
        className="input-btn"
        type='text'
        placeholder='edit goal'
        value={goal}
        onChange={(ev) => setGoal(ev.target.value)}
      />
      <button type='submit' className='btn btn-outline-primary'>
        Submit
      </button>
    </form>
  );
};

export default CreateRoutine;
