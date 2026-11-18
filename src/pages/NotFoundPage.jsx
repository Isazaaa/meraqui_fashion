import React from 'react';
import { Link } from 'react-router-dom';

const primaryButton =
  'bg-black-meraqui px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white-custom transition-colors duration-200 hover:bg-blue-serene focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2';

const NotFoundPage = () => {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 pb-24 pt-32 text-center sm:pt-16 md:px-10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">Error 404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black-meraqui md:text-4xl">
        Página no encontrada
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
        La página que buscas no existe o ya no está disponible. Revisa la dirección o vuelve a explorar nuestras colecciones.
      </p>
      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <Link to="/" className={primaryButton}>
          Volver al inicio
        </Link>
        <Link
          to="/categoria/mujer"
          className="text-xs font-medium uppercase tracking-[0.1em] text-black-meraqui underline underline-offset-4 hover:text-blue-serene focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
        >
          Ver categorías
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
