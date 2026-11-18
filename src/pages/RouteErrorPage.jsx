import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const RouteErrorPage = () => {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
        {isNotFound ? 'Error 404' : 'Error'}
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black-meraqui md:text-4xl">
        {isNotFound ? 'Página no encontrada' : 'Algo salió mal'}
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-500">
        Ocurrió un problema inesperado al cargar esta página. Intenta recargarla o vuelve al inicio.
      </p>
      {/* Plain anchor on purpose: a full reload resets any broken router/render state. */}
      <a
        href="/"
        className="mt-8 bg-black-meraqui px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white-custom transition-colors duration-200 hover:bg-blue-serene focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
      >
        Volver al inicio
      </a>
    </div>
  );
};

export default RouteErrorPage;
