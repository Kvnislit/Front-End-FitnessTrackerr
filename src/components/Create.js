import React, { useState } from 'react';

const CreateRoutine = ({ token }) => {
   console.log(token)
   
    const [name, setName] = useState("");
    const [goal, setGoal] = useState("");
  
    const handleSubmit = async (ev) => {
      ev.preventDefault();
      console.log('name, goal:', name, goal)
      const response = await fetch(`http://fitnesstrac-kr.herokuapp.com/api/routines`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            name: name,
            goal: goal,
            isPublic: true
          })
        });
      const data= await response.json();
      console.log('data:' , data)
    }
    return (
      <form className='update' onSubmit={handleSubmit}>
        <h2>Create Routine</h2>
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
   export default CreateRoutine