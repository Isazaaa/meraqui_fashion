import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

const WHATSAPP_URL =
  "https://wa.me/573205646710?text=¡Hola!%20Vengo%20de%20la%20página%20web%20de%20Meraqui%20Fashion.";

const Layout = () => {
  const { pathname } = useLocation();
  // Product pages have their own WhatsApp call to action, and the floating
  // button would cover the size selector on mobile.
  const showFloatingWhatsapp = !pathname.startsWith("/producto/");

  return (
    <>
      <Navbar />
      {/* Offset matches the fixed header height (h-14 on mobile, h-16 from sm). */}
      <main className="min-h-[calc(100vh-12rem)] pt-14 sm:pt-16">
        <Outlet />
      </main>
      <Footer />

      {showFloatingWhatsapp && (
        <a
          href={WHATSAPP_URL}
          className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black-meraqui focus-visible:ring-offset-2 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:right-[calc(1.5rem+env(safe-area-inset-right))] sm:h-[52px] sm:w-[52px]"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactar por WhatsApp"
        >
          <FaWhatsapp aria-hidden="true" />
        </a>
      )}
    </>
  );
};

export default Layout;
