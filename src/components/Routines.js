import React, {useState, useEffect} from 'react'
import { CreateRoutines, UpdateRoutines, UserRoutines, Activities } from '../components';
import { fetchAllRoutines, exchangeTokenForUser } from '../api';


export default function Routines() {
  const [routines, setRoutines] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [routineId, setRoutineId] = useState(null);
  console.log(routines)
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
    if (window.confirm("Are you sure you want to delete this routine?")) {
      try {
        const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines/${postIdToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log('data:', data)
        if (data.success) {
          setRoutines(routines.filter(routine => routine.id !== postIdToDelete));
        } else {
          console.error(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }


  return (
    <div id="routine-container">
      <title>Routines</title>
      <CreateRoutines token={token} setRoutines={setRoutines} />
      <UpdateRoutines routines={routines} setRoutines={setRoutines} user={user} token={token} 
      setRoutineId={setRoutineId} routineId={routineId} handleDelete={handleDelete} />
      <UserRoutines user={user} routines={routines} />
  
      <h2>({routines.length})</h2>
      <ul>
        {routines.map((routine) => {
          const className = user && routine.creatorId === user.id ? 'singleRoutine myRoutine' : 'singleRoutine'
          
          return (
            <li key={routine.id} className={className}>
              <h1>{routine.name}</h1>
              <p>{routine.goal}</p>
              <p><u>Name:</u>{routine.creatorName}</p>
              {user && routine.creatorId === user.id ? 
                <>
                  <button type="button" className="btn btn-outline-primary" onClick={() => setRoutineId(routine.id)}>Edit</button>
                  <button type="button" className="btn btn-outline-primary" onClick={() => handleDelete(routine.id)}>Delete</button>
                </> : null
              }
            </li>
          );
        })}
      </ul>

    </div>
  );
}
