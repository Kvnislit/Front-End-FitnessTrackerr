import React, { useState, useEffect } from 'react';
import { Activities, CreateRoutines, UpdateRoutines, UserRoutines } from '../components';
import { fetchAllRoutines, exchangeTokenForUser } from '../api';

export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [routineId, setRoutineId] = useState(null);
  const [handleEditOpen, setHandleEditOpen] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      exchangeTokenForUser(setToken, setUser);
    }
    fetchAllRoutines()
      .then((data) => setRoutines(data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (postIdToDelete) => {
    if (window.confirm('Are you sure you want to delete this routine?')) {
      try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${postIdToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log('data:', data);
        if (data.success) {
          setRoutines(routines.filter((routine) => routine.id !== postIdToDelete));
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  function handleEdit(routineId) {
    console.log(routineId);
    setRoutineId(routineId);
    setHandleEditOpen(true);
  }

  //was breaking 
  const sortedRoutines = routines.reduce((acc, routine) => {
    if (routine.creatorId === user) {
      return [routine, ...acc];
    } else {
      return [...acc, routine];
    }
  }, []).reverse();

  return (
    <div id="routine-container">
      <title>Routines</title>
      <CreateRoutines token={token} routineId={routineId} setRoutines={setRoutines} />
      {handleEditOpen && (
        <UpdateRoutines
          routines={routines}
          setRoutines={setRoutines}
          user={user}
          routineId={routineId}
          token={token}
          setRoutineId={setRoutineId}
          handleDelete={handleDelete}
        />
      )}
      <h2>({routines.length})</h2>
      <ul>
        {sortedRoutines.map((routine) => {
          const className =
            user && routine.creatorId === user.id
              ? "singleRoutine myRoutine"
              : "singleRoutine";

          return (
            <li key={routine.id} className={className}>
              <div className='routineBox'>
                <h1>{routine.name}</h1>
                <p>Goal: {routine.goal}</p>
                <p><u>Name:</u> {routine.creatorName}</p>
                {user && routine.creatorId === user.id ? (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => handleEdit(routine.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={() => handleDelete(routine.id)}
                    >
                      Delete
                    </button>
                  </>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
