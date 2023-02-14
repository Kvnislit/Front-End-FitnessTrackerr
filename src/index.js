import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import Routines from './api/routines';
import Header from './components/header'


const App = () => {
  return (
    <div className="container">
      
   <section>
    <Header />
    <Routines />
   </section>
   <article>

   </article>
  </div>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
