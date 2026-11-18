import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import LogoMeraqui from '../assets/meraquilogo.webp';

const WHATSAPP_URL =
    'https://wa.me/573205646710?text=¡Hola!%20Vengo%20de%20la%20página%20web%20de%20Meraqui%20Fashion.';
const INSTAGRAM_URL = 'https://www.instagram.com/meraquifashion/';
const EMAIL = 'info@meraquifashion.com';

const EXPLORE_LINKS = [
    { to: '/categoria/mujer', label: 'Mujer' },
    { to: '/categoria/hombre', label: 'Hombre' },
    { to: '/categoria/infantil', label: 'Infantil' },
    { to: '/customizePage', label: 'Personalizar' },
];

const LEGAL_LINKS = [
    { to: '/politicas-privacidad', label: 'Políticas de Privacidad' },
    { to: '/terminos-condiciones', label: 'Términos y Condiciones' },
    { to: '/envios-devoluciones', label: 'Envíos y Devoluciones' },
];

const focusRing =
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-serene';

// Min 44px tap target on touch screens, compact on desktop.
const linkClass = `inline-flex min-h-11 items-center text-sm text-neutral-600 transition-colors duration-200 hover:text-black-meraqui hover:underline underline-offset-4 lg:min-h-8 ${focusRing}`;

const headingClass =
    'mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-black-meraqui lg:mb-4';

const socialButtonClass = `inline-flex h-11 w-11 items-center justify-center rounded-full border border-light-gray-meraqui text-lg text-black-meraqui transition-colors duration-200 hover:border-black-meraqui hover:bg-black-meraqui hover:text-white-custom ${focusRing}`;

const FooterLinkList = ({ links }) => (
    <ul>
        {links.map(({ to, label }) => (
            <li key={to}>
                <Link to={to} className={linkClass}>
                    {label}
                </Link>
            </li>
        ))}
    </ul>
);

const Footer = () => {
    return (
        <footer className="border-t border-light-gray-meraqui bg-neutral-50 text-neutral-600">
            <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-12 lg:gap-x-10 lg:py-16">
                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-4">
                        <Link
                            to="/"
                            aria-label="Meraqui Fashion, ir al inicio"
                            className={`inline-flex min-h-11 items-center ${focusRing}`}
                        >
                            <img
                                src={LogoMeraqui}
                                alt="Meraqui Fashion"
                                width="200"
                                height="40"
                                className="h-9 w-auto"
                            />
                        </Link>
                        <p className="mt-5 max-w-sm text-sm leading-relaxed">
                            Tienda virtual de ropa casual con confección, estampado y bordado personalizado.
                            Ideal para empresas, fechas especiales o emprendedoras.
                            Calidad, buen precio y envíos a todo el país.
                        </p>
                    </div>

                    {/* Explore */}
                    <nav aria-label="Explora" className="lg:col-span-2">
                        <h2 className={headingClass}>Explora</h2>
                        <FooterLinkList links={EXPLORE_LINKS} />
                    </nav>

                    {/* Help / legal */}
                    <nav aria-label="Ayuda y legal" className="lg:col-span-3">
                        <h2 className={headingClass}>Ayuda</h2>
                        <FooterLinkList links={LEGAL_LINKS} />
                    </nav>

                    {/* Contact + social */}
                    <div className="col-span-2 lg:col-span-3">
                        <h2 className={headingClass}>Contacto</h2>
                        <ul>
                            <li>
                                <a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${linkClass} gap-3`}
                                >
                                    <FaWhatsapp aria-hidden="true" className="text-base text-black-meraqui" />
                                    +57 320 564 6710
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${EMAIL}`} className={`${linkClass} gap-3`}>
                                    <FaEnvelope aria-hidden="true" className="text-base text-black-meraqui" />
                                    {EMAIL}
                                </a>
                            </li>
                        </ul>
                        <div className="mt-4 flex gap-3">
                            <a
                                href={INSTAGRAM_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram de Meraqui Fashion"
                                className={socialButtonClass}
                            >
                                <FaInstagram aria-hidden="true" />
                            </a>
                            <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp de Meraqui Fashion"
                                className={socialButtonClass}
                            >
                                <FaWhatsapp aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar. Extra bottom padding keeps the floating WhatsApp button off the content. */}
                <div className="flex flex-col gap-1 border-t border-light-gray-meraqui pb-28 pt-6 text-xs text-neutral-600 lg:flex-row lg:items-center lg:justify-between lg:pb-24">
                    <p>&copy; {new Date().getFullYear()} Meraqui Fashion. Todos los derechos reservados.</p>
                    <p>
                        Desarrollado por{' '}
                        <a
                            href="https://stelarcode.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex min-h-11 items-center font-semibold text-black-meraqui underline-offset-4 hover:underline lg:min-h-0 ${focusRing}`}
                        >
                            StelarCode
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
