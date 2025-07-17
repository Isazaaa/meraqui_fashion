import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-container">
      <div className="hero-content">
        <h1>Viste con intención, define tu estilo</h1>
        <p>Descubre prendas únicas que cuentan tu historia.</p>
        <Link to="/categoria/mujer" className="hero-cta-button">
          Explorar Colección
        </Link>
      </div>
    </section>
  );
};

export default Hero;