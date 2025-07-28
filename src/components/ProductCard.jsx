import React from "react";

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Puedes ajustar este valor para controlar la altura de la imagen en las tarjetas.
  // Cuanto mayor sea el número, más grande será la imagen verticalmente.
  // h-80 es 320px, h-88 es 352px, h-96 es 384px.
  const fixedImageHeightClass = "h-80"; // Aumentamos la altura de la imagen

  return (
    <div className="no-underline text-inherit block h-full">
      {/* Reducimos el padding general de la tarjeta de p-2 a p-1 */}
      <article className="flex flex-col h-full overflow-hidden group p-1">
        {" "}
        {/* p-1 para un margen visual más sutil */}
        {/* Contenedor de imagen con altura fija y object-cover */}
        <div
          className={`w-full relative overflow-hidden bg-gray-100 flex justify-center items-center rounded-md ${fixedImageHeightClass}`}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105" // Usamos object-cover y object-center
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-600 text-sm text-center">
              No Image Available
            </div>
          )}
        </div>
        {/* Información centrada debajo de la imagen */}
        <div className="py-2 px-1 text-center flex flex-col flex-grow">
          {" "}
          {/* Reducimos py y px aquí también */}
          <h3 className="text-lg font-semibold text-gray-800 leading-tight mb-1">
            {product.name}
          </h3>
          {product.retailPrice && (
            <span className="text-base font-semibold text-blue-serene">
              {formatPrice(product.retailPrice)}
            </span>
          )}
        </div>
      </article>
    </div>
  );
};

export default ProductCard;
