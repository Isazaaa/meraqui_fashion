import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Define una altura fija para el contenedor de la imagen
  const fixedImageHeight = 'h-56'; // Puedes ajustar este valor (ej: h-48, h-64)

  return (
    <Link to={`/producto/${product.id}`} className="no-underline text-inherit block h-full">
      <article className="flex flex-col h-full overflow-hidden group p-2">
        {/* Contenedor de imagen con altura fija y object-fit: contain */}
        <div className={`w-full relative overflow-hidden bg-gray-100 flex justify-center items-center rounded-md ${fixedImageHeight}`}>
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" // Usamos object-contain
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 text-sm text-center">No Image Available</div>
          )}
        </div>
        {/* Información centrada debajo de la imagen */}
        <div className="py-3 px-1.5 text-center flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-1">{product.name}</h3>
          {product.retailPrice && (
            <span className="text-base font-semibold text-blue-serene">{formatPrice(product.retailPrice)}</span>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;