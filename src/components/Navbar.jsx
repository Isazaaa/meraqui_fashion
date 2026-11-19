import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoMf from "../../public/logoMF.webp";
import LogoMeraqui from "../assets/meraquilogo.webp";

const NAV_LINKS = [
  { to: "/categoria/mujer", label: "Mujer", ariaLabel: "Categoría Mujer" },
  { to: "/categoria/hombre", label: "Hombre", ariaLabel: "Categoría Hombre" },
  { to: "/categoria/infantil", label: "Infantil", ariaLabel: "Categoría Infantil" },
  { to: "/categoria/duo", label: "Duo", ariaLabel: "Categoría Duo" },
];

const PERSONALIZE = { to: "/customizePage", label: "Personalizar", ariaLabel: "Personalizar prenda" };

const MENU_ID = "mobile-menu";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2";

const desktopLinkClass = ({ isActive }) =>
  `inline-flex items-center border-b py-1 text-xs font-medium uppercase tracking-[0.16em] transition-colors duration-200 ${focusRing} ${
    isActive
      ? "border-black-meraqui text-black-meraqui"
      : "border-transparent text-neutral-600 hover:text-black-meraqui"
  }`;

const drawerLinkClass = ({ isActive }) =>
  `flex min-h-12 items-center border-b border-neutral-200 text-sm font-medium uppercase tracking-[0.16em] ${focusRing} ${
    isActive ? "text-black-meraqui" : "text-neutral-600"
  }`;

const primaryButton = `inline-flex min-h-11 items-center justify-center bg-black-meraqui text-xs font-medium uppercase tracking-[0.1em] text-white-custom transition-colors duration-200 hover:bg-blue-serene ${focusRing}`;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  // Remember the location key the menu was opened on: navigating changes the key,
  // which closes the menu without needing an effect.
  const [openKey, setOpenKey] = useState(null);
  const location = useLocation();
  const menuOpen = openKey === location.key;
  const toggleRef = useRef(null);
  const drawerRef = useRef(null);

  const closeMenu = useCallback(() => setOpenKey(null), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock, focus management, Esc and focus trap while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return undefined;

    const toggle = toggleRef.current;
    const drawer = drawerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () => Array.from(drawer?.querySelectorAll(FOCUSABLE) ?? []);
    focusables()[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpenKey(null);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!drawer.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    // The drawer is hidden from `sm` up; close it if the viewport grows past
    // that breakpoint so the body scroll lock and focus trap are released.
    const desktopQuery = window.matchMedia("(min-width: 640px)");
    const handleBreakpoint = (event) => {
      if (event.matches) setOpenKey(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleBreakpoint);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleBreakpoint);
      document.body.style.overflow = previousOverflow;
      toggle?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed left-0 top-0 z-[1000] w-full border-b border-neutral-200 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_8px_rgba(0,0,0,0.06)]" : ""
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 sm:h-16 md:px-10 lg:px-16">
        <Link to="/" aria-label="Meraqui Fashion, ir al inicio" className={`flex items-center ${focusRing}`}>
          <img
            src={LogoMf}
            alt=""
            width="40"
            height="32"
            className="h-8 w-auto sm:hidden"
          />
          <img
            src={LogoMeraqui}
            alt="Meraqui Fashion"
            width="160"
            height="36"
            className="hidden h-9 w-auto sm:block"
          />
        </Link>

        {/* Desktop / tablet navigation */}
        <nav aria-label="Categorías" className="hidden items-center gap-8 sm:flex lg:gap-10">
          {NAV_LINKS.map(({ to, label, ariaLabel }) => (
            <NavLink key={to} to={to} aria-label={ariaLabel} className={desktopLinkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center">
          <NavLink
            to={PERSONALIZE.to}
            aria-label={PERSONALIZE.ariaLabel}
            className={`${primaryButton} mr-2 px-4 sm:mr-0 sm:px-6`}
          >
            {PERSONALIZE.label}
          </NavLink>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpenKey(location.key)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            className={`-mr-3 inline-flex h-11 w-11 items-center justify-center text-lg text-black-meraqui sm:hidden ${focusRing}`}
          >
            <FaBars aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id={MENU_ID}
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        hidden={!menuOpen}
        className="fixed inset-0 z-[1001] flex flex-col bg-white sm:hidden"
      >
        <div className="flex h-14 items-center justify-between border-b border-neutral-200 px-5">
          <Link to="/" aria-label="Meraqui Fashion, ir al inicio" onClick={closeMenu} className={`flex min-h-11 items-center ${focusRing}`}>
            <img src={LogoMf} alt="" width="40" height="32" className="h-8 w-auto" />
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Cerrar menú"
            className={`-mr-3 inline-flex h-11 w-11 items-center justify-center text-lg text-black-meraqui ${focusRing}`}
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Menú principal" className="flex flex-1 flex-col overflow-y-auto px-5 pb-8 pt-4">
          {NAV_LINKS.map(({ to, label, ariaLabel }) => (
            <NavLink key={to} to={to} aria-label={ariaLabel} onClick={closeMenu} className={drawerLinkClass}>
              {label}
            </NavLink>
          ))}
          <NavLink
            to={PERSONALIZE.to}
            aria-label={PERSONALIZE.ariaLabel}
            onClick={closeMenu}
            className={`${primaryButton} mt-8 min-h-12 px-6`}
          >
            {PERSONALIZE.label}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
