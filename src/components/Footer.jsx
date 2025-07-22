import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa'; // Asegúrate de instalar react-icons

const Footer = () => {
    return (
        <footer className="bg-black-meraqui text-white-custom py-16 px-5 md:px-10 lg:px-20 font-montserrat">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12 border-b border-gray-700">
                {/* Sección 1: Meraqui Fashion - Descripción */}
                <div className="footer-section">
                    <h4 className="text-2xl font-bold mb-4 text-blue-serene">Meraqui Fashion</h4>
                    {/* Texto ahora en blanco-custom para mayor legibilidad */}
                    <p className="text-white-custom text-sm leading-relaxed">
                        Tienda virtual de ropa casual con confección, estampado y bordado personalizado.
                        Ideal para empresas, fechas especiales o emprendedoras.
                        Calidad, buen precio y envíos a todo el país.
                    </p>
                </div>

                {/* Sección 2: Navegación Rápida */}
                <div className="footer-section">
                    <h4 className="text-xl font-bold mb-4 text-white-custom">Explora</h4>
                    <ul className="space-y-2">
                        <li><Link to="/categoria/mujer" className="text-white-custom hover:text-blue-serene transition-colors duration-300 text-sm">Mujer</Link></li>
                        <li><Link to="/categoria/hombre" className="text-white-custom hover:text-blue-serene transition-colors duration-300 text-sm">Hombre</Link></li>
                        <li><Link to="/categoria/ninos" className="text-white-custom hover:text-blue-serene transition-colors duration-300 text-sm">Niños</Link></li>
                    </ul>
                </div>

                {/* Sección 3: Contacto */}
                <div className="footer-section">
                    <h4 className="text-xl font-bold mb-4 text-white-custom">Contacto</h4>
                    <ul className="space-y-3">
                        <li className="flex items-center text-white-custom text-sm">
                            <FaWhatsapp className="text-blue-serene mr-3 text-lg" />
                            <a href="https://wa.me/573205646710?text=¡Hola!%20Vengo%20de%20la%20página%20web%20de%20Meraqui%20Fashion." target="_blank" rel="noopener noreferrer" className="hover:text-blue-serene transition-colors duration-300">
                                +57 320 564 6710
                            </a>
                        </li>
                        <li className="flex items-center text-white-custom text-sm">
                            <FaEnvelope className="text-blue-serene mr-3 text-lg" />
                            <a href="mailto:info@meraquifashion.com" className="hover:text-blue-serene transition-colors duration-300">
                                info@meraquifashion.com
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Sección 4: Síguenos y Políticas */}
                <div className="footer-section">
                    <h4 className="text-xl font-bold mb-4 text-white-custom">Conéctate</h4>
                    <div className="flex space-x-4 mb-6">
                        <a href="https://www.instagram.com/meraquifashion/" target="_blank" rel="noopener noreferrer"
                            className="text-white-custom hover:text-blue-serene transition-colors duration-300 text-3xl">
                            <FaInstagram />
                        </a>
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-white-custom">Legal</h4>
                    <ul className="space-y-2">
                        <li><Link to="/politicas-privacidad" className="text-white-custom hover:text-blue-serene transition-colors duration-300 text-sm">Políticas de Privacidad</Link></li>
                        <li><Link to="/terminos-condiciones" className="text-white-custom hover:text-blue-serene transition-colors duration-300 text-sm">Términos y Condiciones</Link></li>
                        <li><Link to="/envios-devoluciones" className="text-white-custom hover:text-blue-serene transition-colors duration-300 text-sm">Envíos y Devoluciones</Link></li>
                    </ul>
                </div>
            </div>

            <div className="text-center pt-8 text-gray-400 text-xs">
                {/* Texto "Desarrollado por" con enlace a StelarCode.com */}
                <p>&copy; {new Date().getFullYear()} Meraqui Fashion. Todos los derechos reservados. | Desarrollado por{" "}
                    <a href="https://stelarcode.com" target="_blank" rel="noopener noreferrer" className="text-blue-serene hover:text-white-custom font-semibold transition-colors duration-300">
                        StelarCode
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;