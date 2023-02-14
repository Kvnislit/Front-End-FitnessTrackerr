import React, { useEffect } from 'react';

const Header = () => {
  useEffect(() => {
    const menu = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    menu.addEventListener('click', () => {
        menu.classList.toggle('bx-x');
        navbar.classList.toggle('open');
      });
    }, []);
  

  return (
    <section>
      <header className="header">
        <a href="#" className="logo">
          <i className="bx bx-happy"></i>
          Fitness Tracker
        </a>

        <div className="bx bx-menu" id="menu-icon"></div>

        <ul className="navbar">
          <li><a href="#">Routines</a></li>
          <li><a href="#">Register</a></li>
          <li><a href="#">About</a></li>
        </ul>
        <div className="header-btn">
          <a href="#" className="sign-up">Sign Up</a>
          <a href="#" className="in">Login</a>
        </div>
      </header>
    </section>
  );
};

export default Header;