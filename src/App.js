import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Routines, RoutineDetails } from './api/routines';
import NavBar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import {Activities} from './components/Activities';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Routines />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/routines" element={<Routines />} />
        <Route path="/Activities" element={<Activities />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;