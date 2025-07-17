import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Meraqui Fashion</h4>
                    <p>Tienda virtual de ropa casual con confección, estampado y bordado personalizado.
                        Ideal para empresas, fechas especiales o emprendedor@s.
                        Calidad, buen precio y envíos a todo el país.</p>
                </div>
                <div className="footer-section">
                    <h4>Categorías</h4>
                    <Link to="/categoria/mujer">Mujer</Link>
                    <Link to="/categoria/hombre">Hombre</Link>
                    <Link to="/categoria/ninos">Niños</Link>
                </div>
                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <a href="https://www.instagram.com/meraquifashion/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="#" target="_blank" rel="noopener noreferrer"></a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Meraqui Fashion. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;