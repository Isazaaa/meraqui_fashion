import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoMf from "../assets/logoMF.png";
import LogoMeraqui from "../assets/meraquilogo.png";
import { FaFemale, FaMale, FaChild, FaPaintBrush } from "react-icons/fa";
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
    <>
      {/* Header para móvil: TODO a la derecha, sin slogan ni separador */}
      <header className="navbar-mobile fixed top-0 left-0 w-full z-[1000] bg-white/90 shadow-lg px-4 flex items-center justify-between h-14 sm:hidden">
        <div className="flex-shrink-0 flex items-center justify-center w-14 h-14">
          <img
            src={LogoMf}
            alt="Meraqui Fashion Logo"
            className="h-8 w-auto mx-auto"
            style={{ maxHeight: "32px" }}
          />
        </div>
        <nav className="flex-1 flex items-center justify-end overflow-x-auto gap-2 pr-2">
          <NavLink to="/customizePage" className="nav-category-link group">
            <FaPaintBrush className="nav-category-icon" />
          </NavLink>
          <NavLink to="/categoria/mujer" className="nav-category-link group">
            <FaFemale className="nav-category-icon" />
          </NavLink>
          <NavLink to="/categoria/hombre" className="nav-category-link group">
            <FaMale className="nav-category-icon" />
          </NavLink>
          <NavLink to="/categoria/ninos" className="nav-category-link group">
            <FaChild className="nav-category-icon" />
          </NavLink>
        </nav>
      </header>

      {/* Header para tablet/PC: Personalizar + slogan a la izquierda */}
      <header
        className={`
        navbar-desktop fixed top-0 left-0 w-full z-[1000] flex justify-between items-center
        shadow-lg transition-all duration-500 ease-in-out
        ${
          scrolled
            ? "py-3 h-16 bg-white/80 backdrop-blur-md scrolled-gradient"
            : "py-8 h-28 bg-white/90"
        }
        px-8 md:px-10
        hidden sm:flex
      `}
      >
        {/* Botón Personalizar a la izquierda + slogan SOLO en desktop/tablet */}
        <div className="flex-1 flex items-center navbar-left">
          <NavLink
            to="/customizePage"
            className="nav-category-link nav-personalizar text-blue-serene hover:text-black-meraqui [&.active]:text-black-meraqui"
          >
            <FaPaintBrush className="nav-category-icon" />
            <span>Personalizar</span>
          </NavLink>
          <span
            className="navbar-slogan"
            title="Haz clic aquí para personalizar tu prenda"
          >
            ¡Haz clic aquí y personaliza tu estilo!
          </span>
        </div>
        <div className="flex-2 flex justify-center items-center overflow-hidden relative">
          <Link
            to="/"
            className="flex justify-center items-center w-full h-full"
          >
            <img
              src={LogoMeraqui}
              alt="Meraqui Fashion Logo Principal"
              className={`h-20 w-auto transition-all duration-500 ease-in-out-expo ${
                scrolled
                  ? "opacity-0 scale-0 absolute"
                  : "opacity-100 scale-100"
              }`}
            />
            <img
              src={LogoMf}
              alt="Meraqui Fashion Logo Compacto"
              className={`h-10 w-auto transition-all duration-500 ease-in-out-expo ${
                scrolled
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-0 absolute"
              }`}
            />
          </Link>
        </div>
        <nav className="flex-1 flex justify-end items-center gap-6 md:gap-10">
          <NavLink
            to="/categoria/mujer"
            className="nav-category-link group text-blue-serene hover:text-black-meraqui [&.active]:text-black-meraqui"
          >
            <FaFemale className="nav-category-icon" />
            <span>Mujer</span>
          </NavLink>
          <NavLink
            to="/categoria/hombre"
            className="nav-category-link group text-blue-serene hover:text-black-meraqui [&.active]:text-black-meraqui"
          >
            <FaMale className="nav-category-icon" />
            <span>Hombre</span>
          </NavLink>
          <NavLink
            to="/categoria/ninos"
            className="nav-category-link group text-blue-serene hover:text-black-meraqui [&.active]:text-black-meraqui"
          >
            <FaChild className="nav-category-icon" />
            <span>Niños</span>
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
