import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import { Routines, RoutineDetails } from './api/routines';
import Header from './components/header'
import Login from './components/Login'
import Register from './components/Register'


const App = () => {
  return (
    <div className="container">
      
   <section>
    <Login />
    <Register />
    <Header />
    <Routines />
    <RoutineDetails />
   </section>
   
   <article>

   </article>
  </div>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
