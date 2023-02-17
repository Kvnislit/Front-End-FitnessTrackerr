import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = () => {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const register = async (ev) => {
    ev.preventDefault();
    try {
      const result = await registerUser(registerUsername, registerPassword);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="register" onSubmit={register}>
      <h1 className="registerIn">Please register here!</h1>
      <input
      className="registerIn"
        placeholder="username"
        value={registerUsername}
        onChange={ev => setRegisterUsername(ev.target.value)} />

      <input
      className="registerIn"
        placeholder="password"
        value={registerPassword}
        onChange={ev => setRegisterPassword(ev.target.value)} />

      <button className="registerIn">Register</button>
    </form>
  )
};

export default Register;


