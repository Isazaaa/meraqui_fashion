import React from 'react';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';
import CategoriaMujerImg from '../assets/images/categoria-mujer.jpg';
import CategoriaHombreImg from '../assets/images/categoria-hombre.jpg';
import CategoriaNinosImg from '../assets/images/categoria-ninos.jpg';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Hero />
      <section className="py-16 px-5 md:px-10 lg:px-20 text-center">
        <h2 className="font-playfair text-4xl md:text-5xl mb-12 text-black-meraqui">Nuestras Colecciones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Tarjeta de Colección para Mujer */}
          <Link 
            to="/categoria/mujer" 
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out block no-underline text-center"
          >
            <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden">
                <img 
                    src={CategoriaMujerImg} 
                    alt="Colección Mujer" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                {/* Overlay sutil para unificar el estilo de las imágenes, con baja opacidad */}
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20"></div>
            </div>
            {/* Contenido de texto debajo de la imagen */}
            <div className="p-4 bg-white-custom">
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-black-meraqui m-0">Mujer</h3>
                <p className="font-montserrat text-base text-gray-700 mt-2">Explora la última moda</p>
            </div>
          </Link>

          {/* Tarjeta de Colección para Hombre */}
          <Link 
            to="/categoria/hombre" 
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out block no-underline text-center"
          >
            <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden">
                <img 
                    src={CategoriaHombreImg} 
                    alt="Colección Hombre" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                {/* Overlay sutil para unificar el estilo de las imágenes, con baja opacidad */}
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20"></div>
            </div>
            {/* Contenido de texto debajo de la imagen */}
            <div className="p-4 bg-white-custom">
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-black-meraqui m-0">Hombre</h3>
                <p className="font-montserrat text-base text-gray-700 mt-2">Estilo que te define</p>
            </div>
          </Link>

          {/* Tarjeta de Colección para Niños */}
          <Link 
            to="/categoria/ninos" 
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out block no-underline text-center"
          >
            <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden">
                <img 
                    src={CategoriaNinosImg} 
                    alt="Colección Niños" 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                {/* Overlay sutil para unificar el estilo de las imágenes, con baja opacidad */}
                <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/20"></div>
            </div>
            {/* Contenido de texto debajo de la imagen */}
            <div className="p-4 bg-white-custom">
                <h3 className="font-playfair text-3xl md:text-4xl font-bold text-black-meraqui m-0">Niños</h3>
                <p className="font-montserrat text-base text-gray-700 mt-2">Diversión y comodidad</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;