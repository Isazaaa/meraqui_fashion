import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* Ajusta el padding-top del main para compensar el header fijo y dinámico.
          El valor 'pt-28' es un valor seguro que cubre la altura máxima del navbar.
          En pantallas más pequeñas (md), el navbar es más pequeño, puedes ajustar si es necesario.
          Considera la altura del navbar grande (aprox. h-28 = 112px) y la del navbar encogido (h-16 = 64px).
      */}
      <main className="min-h-[calc(100vh-12rem)] pt-28 md:pt-28"> 
        <Outlet />
      </main>
      <Footer />

      {/* Botón flotante de WhatsApp - Clases confirmadas */}
      <a
        href="https://wa.me/573205646710?text=¡Hola!%20Vengo%20de%20la%20página%20web%20de%20Meraqui%20Fashion."
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white-custom rounded-full flex justify-center items-center text-3xl shadow-lg z-50 transition-transform duration-300 hover:scale-110"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png" alt="Contactar por WhatsApp" className="w-9 h-auto" />
      </a>
    </>
  );
};

export default Layout;