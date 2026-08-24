import React from "react";
import { Outlet } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* Elimina el padding-top solo en móvil, mantén en desktop/tablet */}
      <main className="min-h-[calc(100vh-12rem)] pt-0 sm:pt-28">
        <Outlet />
      </main>
      <Footer />

      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/573205646710?text=¡Hola!%20Vengo%20de%20la%20página%20web%20de%20Meraqui%20Fashion."
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#25D366] text-white rounded-full flex justify-center items-center text-4xl shadow-lg z-50 transition-transform duration-300 hover:scale-110"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </>
  );
};

export default Layout;
