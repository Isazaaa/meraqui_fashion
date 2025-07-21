import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoMf from '../assets/logoMF.png';       // El logo que aparece al SCROLL
import LogoMeraqui from '../assets/meraquilogo.png'; // El logo INICIAL

// Importa los íconos necesarios
import { FaFemale, FaMale, FaChild } from 'react-icons/fa'; 

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 80);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`
      fixed top-0 left-0 w-full z-[1000] flex justify-between items-center
      shadow-lg transition-all duration-500 ease-in-out
      ${scrolled 
        ? 'py-3 h-16 bg-white/80 backdrop-blur-md scrolled-gradient' 
        : 'py-8 h-28 bg-white/90'}
      px-5 md:px-10
    `}>
      <div className="flex-1 flex justify-start items-center">
        {/* Space for mobile menu icon if needed */}
      </div>

      <div className="flex-2 flex justify-center items-center overflow-hidden">
        {scrolled ? ( // AL SCROLL: Muestra LogoMf (el pequeño)
          <Link to="/" className="transition-all duration-500 ease-in-out">
            <img 
              src={LogoMf} 
              alt="Meraqui Fashion Logo Compacto" 
              className="h-10 w-auto transition-all duration-500 ease-in-out opacity-100 scale-100"
            />
          </Link>
        ) : ( // INICIAL: Muestra MeraquiLogo (el principal)
          <Link to="/" className="no-underline transition-all duration-500 ease-in-out">
            <img 
              src={LogoMeraqui} 
              alt="Meraqui Fashion Logo Principal" 
              className="h-20 w-auto transition-all duration-500 ease-in-out opacity-100 scale-100" 
            />
          </Link>
        )}
      </div>
      
      <nav className="flex-1 flex justify-end items-center gap-6 md:gap-10">
        {/* Categoría Mujer */}
        <NavLink 
          to="/categoria/mujer" 
          className="group flex items-center gap-1 font-montserrat font-medium text-base relative px-3 py-2 -mx-3 rounded-md 
                     transition-all duration-300 ease-in-out 
                     text-blue-serene hover:text-black-meraqui 
                     hover:bg-light-gray-meraqui/30 [&.active]:text-black-meraqui [&.active]:bg-light-gray-meraqui/20" // Nuevo: fondo sutil en hover y activo
        >
          <FaFemale className="text-lg transition-colors duration-300 group-hover:text-black-meraqui [&.active]:text-black-meraqui" /> 
          <span>Mujer</span>
          {/* La línea inferior se elimina o se transforma en el fondo sutil */}
        </NavLink>

        {/* Categoría Hombre */}
        <NavLink 
          to="/categoria/hombre" 
          className="group flex items-center gap-1 font-montserrat font-medium text-base relative px-3 py-2 -mx-3 rounded-md 
                     transition-all duration-300 ease-in-out 
                     text-blue-serene hover:text-black-meraqui 
                     hover:bg-light-gray-meraqui/30 [&.active]:text-black-meraqui [&.active]:bg-light-gray-meraqui/20"
        >
          <FaMale className="text-lg transition-colors duration-300 group-hover:text-black-meraqui [&.active]:text-black-meraqui" /> 
          <span>Hombre</span>
        </NavLink>

        {/* Categoría Niños */}
        <NavLink 
          to="/categoria/ninos" 
          className="group flex items-center gap-1 font-montserrat font-medium text-base relative px-3 py-2 -mx-3 rounded-md 
                     transition-all duration-300 ease-in-out 
                     text-blue-serene hover:text-black-meraqui 
                     hover:bg-light-gray-meraqui/30 [&.active]:text-black-meraqui [&.active]:bg-light-gray-meraqui/20"
        >
          <FaChild className="text-lg transition-colors duration-300 group-hover:text-black-meraqui [&.active]:text-black-meraqui" /> 
          <span>Niños</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;