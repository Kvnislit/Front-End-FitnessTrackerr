import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';

const App = ()=> {
  const [ routines, setRoutines ] = useState([]);
  useEffect(() => {
  fetch('http://fitnesstrac-kr.herokuapp.com/api/routines')
  .then(( response => response.json()))
  .then( routines => setRoutines(routines))
  }, []);
  return (
    <div>
      <h1>Fitness Tracker</h1>
      <h2>Routines({routines.length})</h2>
      <ul>
        {
          routines.map( routine => {
            return(
              <li key={ routine.id} >
                {routine.name}({routine.activities.length})
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

const root = createRoot(document.querySelector('#root'));

root.render(<App />);
