import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = products.find(p => p.id == productId);

  if (!product) {
    return (
      <div className="text-center py-20 px-5">
        <h2 className="text-2xl font-bold text-gray-800">Producto no encontrado</h2>
      </div>
    );
  }

  const [selectedSize, setSelectedSize] = useState(null);

  const formatPrice = (price) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const productNameForWhatsApp = encodeURIComponent(product.name);
  const sizeForWhatsApp = selectedSize ? encodeURIComponent(` en talla: ${selectedSize}`) : '';
  const whatsappLink = `https://wa.me/573205646710?text=¡Hola!%20Estoy%20interesado%20en%20el%20${productNameForWhatsApp}${sizeForWhatsApp}.`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mx-auto my-12 px-5">
      <div className="flex flex-col">
        <div className="rounded-xl overflow-hidden shadow-lg mb-4">
          <img src={product.image} alt={product.name} className="w-full h-auto block" />
        </div>
      </div>

      <div className="flex flex-col">
        <h1 className="font-playfair text-4xl text-gray-800 mb-2">{product.name}</h1>
        {product.retailPrice && <p className="font-montserrat text-3xl font-semibold text-blue-serene mb-8">{formatPrice(product.retailPrice)}</p>}

        <div className="mb-8">
          <h2 className="font-semibold mb-4 text-lg border-b border-gray-200 pb-2">Selecciona tu Talla</h2>
          <div className="flex gap-3">
            {product.sizes && product.sizes.map(size => (
              <button
                key={size}
                className={`bg-white-custom border border-gray-300 py-3 px-5 rounded-full cursor-pointer font-montserrat font-medium transition-all duration-200
                  hover:border-gray-800 ${selectedSize === size ? 'bg-black-meraqui text-white-custom border-black-meraqui' : 'text-gray-700'}`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block w-full bg-[#25D366] text-white-custom text-center py-4 rounded-lg no-underline text-xl font-semibold transition-colors duration-300 hover:bg-[#1DAE54]">
          Pedir por WhatsApp
        </a>

        <div className="mt-8">
          <h2 className="font-semibold mb-4 text-lg border-b border-gray-200 pb-2">Precios Especiales y Materiales</h2>
          <div className="text-gray-700">
            {product.materials && <p className="mb-2"><strong className="font-semibold">Materiales:</strong> {product.materials}</p>}
            <ul className="list-none p-0 my-2">
              {product.wholesalePrice && <li className="mb-1"><strong className="font-semibold">Al por Mayor (desde 6 unidades):</strong> {formatPrice(product.wholesalePrice)}</li>}
              {product.specialFabricPrice && <li><strong className="font-semibold">Opción Tela Fría:</strong> {formatPrice(product.specialFabricPrice)}</li>}
            </ul>
            <p className="text-sm text-gray-500 mt-4">Contáctanos por WhatsApp para realizar tus compras.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;