import React, { useState } from 'react';
import { postRoutine } from '../api';

const CreateRoutine = ({ token }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const data = await postRoutine(token, name, goal);
      console.log('data:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className='update' onSubmit={handleSubmit}>
      <h2>Create Routine</h2>
      <input
        classname="input-btn"
        type='text'
        placeholder='edit name'
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <input
        classname="input-btn"
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
