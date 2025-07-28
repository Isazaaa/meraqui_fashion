import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoMf from "../assets/logoMF.png"; 
import LogoMeraqui from "../assets/meraquilogo.png"; 

import { FaFemale, FaMale, FaChild, FaPaintBrush } from "react-icons/fa"; // Importa FaPaintBrush
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`
      fixed top-0 left-0 w-full z-[1000] flex justify-between items-center
      shadow-lg transition-all duration-500 ease-in-out
      ${
        scrolled
          ? "py-3 h-16 bg-white/80 backdrop-blur-md scrolled-gradient"
          : "py-8 h-28 bg-white/90"
      }
      px-5 md:px-10
    `}
    >
      <div className="flex-1 flex justify-start items-center">
        {/* Este div puede usarse para un futuro menú hamburguesa en móviles */}
      </div>

      <div className="flex-2 flex justify-center items-center overflow-hidden relative">
        <Link to="/" className="flex justify-center items-center w-full h-full">
          {/* Logo Meraqui (inicial, grande) */}
          <img
            src={LogoMeraqui}
            alt="Meraqui Fashion Logo Principal"
            className={`h-20 w-auto transition-all duration-500 ease-in-out-expo ${
              scrolled ? "opacity-0 scale-0 absolute" : "opacity-100 scale-100"
            }`}
          />
          {/* Logo MF (al scroll, pequeño) */}
          <img
            src={LogoMf}
            alt="Meraqui Fashion Logo Compacto"
            className={`h-10 w-auto transition-all duration-500 ease-in-out-expo ${
              scrolled ? "opacity-100 scale-100" : "opacity-0 scale-0 absolute"
            }`}
          />
        </Link>
      </div>

      <nav className="flex-1 flex justify-end items-center gap-6 md:gap-10">
        {/* Categoría Mujer */}
        <NavLink
          to="/categoria/mujer"
          className="nav-category-link group text-blue-serene hover:text-black-meraqui [&.active]:text-black-meraqui"
        >
          <FaFemale className="nav-category-icon" />
          <span>Mujer</span>
        </NavLink>

        {/* Categoría Hombre */}
        <NavLink
          to="/categoria/hombre"
          className="nav-category-link group text-blue-serene hover:text-black-meraqui [&.active]:text-black-meraqui"
        >
          <FaMale className="nav-category-icon" />
          <span>Hombre</span>
        </NavLink>

        {/* Categoría Niños */}
        <NavLink
          to="/categoria/ninos"
          className="nav-category-link group text-blue-serene hover:text-black-meraqui [&.active]:text-black-meraqui"
        >
          <FaChild className="nav-category-icon" />
          <span>Niños</span>
        </NavLink>

        {/* Botón Personalizar - ¡Estilos ahora solo desde CSS! */}
        <NavLink
          to="/customizePage"
          className="nav-category-link group" // No se necesita 'text-blue-serene' aquí, ya se define en CSS
        >
          <FaPaintBrush className="nav-category-icon" />
          <span>Personalizar</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;