import React, { useState, useEffect } from 'react';
import { fetchActivityIds} from '../api';

const UpdateActivities = ({  token, user }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [activityIds, setActivityIds] = useState([]);

  // useEffect(() => {
  //   const fetchActivities = async () => {
  //     const ids = await fetchActivityIds(user.id);
  //     setActivityIds(ids);
  //   }
  //   fetchActivities();
  // }, [user]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log('name, description:', name, description);

    const response = await updateActivity(activityId, token, { name, description });

    const data = await response.json();
    console.log('data:', data);

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

