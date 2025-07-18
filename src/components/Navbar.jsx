import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoMf from '../assets/logoMF.png';       // El logo que aparece al SCROLL
import LogoMeraqui from '../assets/meraquilogo.png'; // El logo INICIAL

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    // Trigger scroll effect at 80px
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
              src={LogoMf} // Aquí usamos LogoMf para el estado 'scrolled'
              alt="Meraqui Fashion Logo Compacto" 
              className="h-10 w-auto transition-all duration-500 ease-in-out opacity-100 scale-100"
            />
          </Link>
        ) : ( // INICIAL: Muestra MeraquiLogo (el principal)
          <Link to="/" className="no-underline transition-all duration-500 ease-in-out">
            <img 
              src={LogoMeraqui} // Aquí usamos LogoMeraqui para el estado INICIAL
              alt="Meraqui Fashion Logo Principal" 
              className="h-20 w-auto transition-all duration-500 ease-in-out opacity-100 scale-100" // Ajusta h-20 para que sea visible
            />
          </Link>
        )}
      </div>
      
      <nav className="flex-1 flex justify-end items-center gap-6 md:gap-10">
        <NavLink 
          to="/categoria/mujer" 
          className="text-blue-serene font-montserrat font-medium text-base relative pb-2 transition-colors duration-300 hover:text-black-meraqui after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-serene after:transition-all after:duration-300 hover:after:w-full [&.active]:after:w-full [&.active]:text-black-meraqui"
        >
          Mujer
        </NavLink>
        <NavLink 
          to="/categoria/hombre" 
          className="text-blue-serene font-montserrat font-medium text-base relative pb-2 transition-colors duration-300 hover:text-black-meraqui after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-serene after:transition-all after:duration-300 hover:after:w-full [&.active]:after:w-full [&.active]:text-black-meraqui"
        >
          Hombre
        </NavLink>
        <NavLink 
          to="/categoria/ninos" 
          className="text-blue-serene font-montserrat font-medium text-base relative pb-2 transition-colors duration-300 hover:text-black-meraqui after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-serene after:transition-all after:duration-300 hover:after:w-full [&.active]:after:w-full [&.active]:text-black-meraqui"
        >
          Niños
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;