import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/logo-MF.jpg';

const Navbar = () => {
  return (
    <header className="navbar-container">
      <Link to="/" className="navbar-logo-link">
        <img src={Logo} alt="Meraqui Fashion Logo" />
      </Link>
      <nav className="navbar-links">
        <NavLink to="/categoria/mujer">Mujer</NavLink>
        <NavLink to="/categoria/hombre">Hombre</NavLink>
        <NavLink to="/categoria/ninos">Niños</NavLink>
      </nav>
      <div className="navbar-actions">
        {/* Espacio reservado para futuros íconos */}
      </div>
    </header>
  );
};

export default Navbar;