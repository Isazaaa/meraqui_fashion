import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

// Este componente es la plantilla principal de tu sitio
const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />

      {/* ====================================================== */}
      {/* =============== CÓDIGO NUEVO AÑADIDO =============== */}
      {/* ====================================================== */}
      <a
        href="https://wa.me/573205646710?text=¡Hola!%20Vengo%20de%20la%20página%20web%20de%20Meraqui%20Fashion."
        className="whatsapp-flotante"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png" alt="Contactar por WhatsApp" />
      </a>
    </>
  );
};

export default Layout;