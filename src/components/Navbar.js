import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';


const NavBar = ({user, logout}) => {
  useEffect(() => {
    const menu = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.navbar li a');

    menu.addEventListener('click', () => {
      menu.classList.toggle('bx-x');
      navbar.classList.toggle('open');
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('bx-x');
        navbar.classList.remove('open');
      });
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

        <nav className="navbar">
          <li><Link to='/Home'>Home</Link></li>
          <li><Link to='/Routines'>Routines</Link></li>
          <li><Link to='/Activities'>Activities</Link></li>
          <li><Link to='/Register'>Sign up</Link></li>
        </nav>

        <div className="header-btn">
        {user.id ? (
            <div className='welcome'>
              Welcome {user.username} <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <>
              <Link to="/Register" className="sign-up">Sign Up</Link>
              <Link to="/login" className="in">Login</Link>
            </>
          )}
        </div>
      </header>
    </section>
  );
};

export default NavBar;