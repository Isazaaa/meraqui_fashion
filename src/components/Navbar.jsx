import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoMf from "../../public/logoMF.png";
import LogoMeraqui from "../assets/meraquilogo.png";
import { FaFemale, FaMale, FaChild, FaPaintBrush, FaUserFriends, FaChevronDown } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Header para móvil (sin cambios) */}
      <header className="navbar-mobile fixed top-0 left-0 w-full z-[1000] bg-white/90 shadow-lg px-4 flex items-center justify-between h-14 sm:hidden">
        <div className="flex-shrink-0 flex items-center justify-center w-14 h-14">
          <Link to="/">
            <img src={LogoMf} alt="Meraqui Fashion Logo" className="h-8 w-auto" />
          </Link>
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
          <NavLink to="/categoria/duo" className="nav-category-link group">
            <FaUserFriends className="nav-category-icon" />
          </NavLink>
        </nav>
      </header>

      {/* Header para tablet/PC (ESTRUCTURA AJUSTADA PARA CENTRADO PERFECTO) */}
      <header
        className={`
          navbar-desktop fixed top-0 left-0 w-full z-[1000] flex justify-between items-center
          shadow-lg transition-all duration-500 ease-in-out
          ${scrolled ? "py-3 h-16 bg-white/80 backdrop-blur-md" : "py-8 h-28 bg-white/90"}
          px-4 md:px-8 lg:px-10
          hidden sm:flex
        `}
      >
        {/* Columna Izquierda (Placeholder) */}
        <div className="flex-1">
          {/* Este div actúa como contrapeso para la navegación de la derecha */}
        </div>

        {/* Columna Central (Logo) */}
        <div className="flex justify-center">
          <Link to="/" className="flex justify-center items-center w-full h-full">
            <img
              src={LogoMeraqui}
              alt="Meraqui Fashion Logo Principal"
              className={`h-20 w-auto transition-all duration-500 ease-in-out-expo ${
                scrolled ? "opacity-0 scale-0 absolute" : "opacity-100 scale-100"
              }`}
            />
            <img
              src={LogoMf}
              alt="Meraqui Fashion Logo Compacto"
              className={`h-10 w-auto transition-all duration-500 ease-in-out-expo ${
                scrolled ? "opacity-100 scale-100" : "opacity-0 scale-0 absolute"
              }`}
            />
          </Link>
        </div>

        {/* Columna Derecha (Navegación) */}
        <nav className="flex-1 flex justify-end items-center gap-4 md:gap-6">
          {/* Menú desplegable para Categorías */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="nav-category-link flex items-center gap-2"
            >
              <span>Categorías</span>
              <FaChevronDown className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`
                dropdown-menu absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20
                transition-all duration-200 ease-out
                ${dropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
              `}
            >
              <NavLink to="/categoria/mujer" className="dropdown-item group">
                <FaFemale className="dropdown-icon" /> Mujer
              </NavLink>
              <NavLink to="/categoria/hombre" className="dropdown-item group">
                <FaMale className="dropdown-icon" /> Hombre
              </NavLink>
              <NavLink to="/categoria/ninos" className="dropdown-item group">
                <FaChild className="dropdown-icon" /> Niños
              </NavLink>
              <NavLink to="/categoria/duo" className="dropdown-item group">
                <FaUserFriends className="dropdown-icon" /> Duo
              </NavLink>
            </div>
          </div>

          {/* Botón Personalizar */}
          <NavLink to="/customizePage" className="nav-personalizar">
            <FaPaintBrush className="nav-category-icon" />
            <span>Personalizar</span>
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Navbar;