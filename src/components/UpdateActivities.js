import React, { useState, useEffect } from 'react';
import { fetchActivityId } from '../api';

const UpdateActivities = ({ token, activityIds }) => {
  console.log(token)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/activities/${activityIds}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        description: description,
      })
    });

    const data = await response.json();
    console.log('data:', data)
    setName('');
    setDescription('');
  }

  return (
    <form className="update" onSubmit={handleSubmit}>
      <h2>Edit Activity</h2>
      <input type="text" placeholder="edit name" value={name} onChange={(ev) => setName(ev.target.value)} />
      <input type="text" placeholder="edit description" value={description} onChange={(ev) => setDescription(ev.target.value)} />
      <button type="submit" className="btn btn-outline-primary">
        Submit
      </button>
    </form>
  );
};

export default UpdateActivities;
