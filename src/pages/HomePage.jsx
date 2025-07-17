import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import './HomePage.css';
import CategoriaMujerImg from '../assets/images/categoria-mujer.jpg';
import CategoriaHombreImg from '../assets/images/categoria-hombre.jpg';
import CategoriaNinosImg from '../assets/images/categoria-ninos.jpg';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Hero />
      <section className="featured-categories">
        <h2 className="section-title">Nuestras Colecciones</h2>
        <div className="categories-grid">
          <Link to="/categoria/mujer" className="category-card">
            <img src={CategoriaMujerImg} alt="Colección Mujer" />
            <div className="card-overlay"><h3>Mujer</h3></div>
          </Link>
          <Link to="/categoria/hombre" className="category-card">
            <img src={CategoriaHombreImg} alt="Colección Hombre" />
            <div className="card-overlay"><h3>Hombre</h3></div>
          </Link>
          <Link to="/categoria/ninos" className="category-card">
            <img src={CategoriaNinosImg} alt="Colección Niños" />
            <div className="card-overlay"><h3>Niños</h3></div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;