import React, { useState } from 'react';
import { postActivity } from '../api';

const CreateActivity = ({ token }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const data = await postActivity(token, name, description);
      console.log('data:', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className='update' onSubmit={handleSubmit}>
      <h2>Create Activity</h2>
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
        placeholder='edit description'
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <button type='submit' className='btn btn-outline-primary'>
        Submit
      </button>
    </form>
  );
};

export default CreateActivity;
