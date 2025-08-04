import React, { useState, useMemo, useEffect } from 'react';
// 1. Importar 'Link' junto a 'useParams'
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductDetailAccordion.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = products.find(p => p.id == productId);

  // Forzar scroll al inicio al cambiar de producto
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  if (!product) {
    return (
      <div className="text-center py-20 px-5 font-sans">
        <h2 className="text-2xl font-bold text-gray-800">Producto no encontrado</h2>
        <p className="text-gray-600 mt-4">Parece que el producto que buscas no existe o fue retirado.</p>
      </div>
    );
  }

  const [selectedSize, setSelectedSize] = useState('');

  const formatPrice = (price) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const productNameForWhatsApp = encodeURIComponent(product.name);
  const sizeForWhatsApp = selectedSize ? encodeURIComponent(` en talla ${selectedSize}`) : '';
  const whatsappLink = `https://wa.me/573205646710?text=¡Hola!%20Estoy%20interesado%20en%20el%20producto%20*${productNameForWhatsApp}*%20${sizeForWhatsApp}.%0A%0APor%20favor,%20dame%20más%20información.`;

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const recommendedProducts = useMemo(() => {
    // Reiniciar la talla seleccionada cuando el producto principal cambia
    setSelectedSize('');
    return shuffleArray(
      products.filter(p => p.category === product.category && p.id != product.id)
    ).slice(0, 4);
  }, [productId, product.category, product.id]); // Dependencias más precisas

  return (
    <div className="max-w-[1200px] mx-auto my-12 px-5 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col items-center">
          <div className="w-full rounded-xl overflow-hidden shadow-xl mb-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto max-h-[600px] object-contain block bg-gray-100"
            />
          </div>
        </div>

        <div className="flex flex-col p-4 md:p-0">
          <h1 className="text-4xl md:text-5xl text-black-meraqui font-bold mb-3">{product.name}</h1>
          {product.retailPrice && (
            <p className="text-3xl font-semibold text-blue-serene mb-8">{formatPrice(product.retailPrice)}</p>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-4 text-lg text-gray-800 border-b border-gray-200 pb-2">
                Selecciona tu Talla
              </h2>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    aria-selected={selectedSize === size}
                    className={`
                      size-button border-2 font-medium py-2 px-4 rounded-full cursor-pointer 
                      transition-all duration-400 ease-in-out-expo text-base
                      ${selectedSize === size 
                        ? 'bg-blue-serene border-blue-serene text-white-custom shadow-lg transform scale-110'
                        : 'bg-white-custom border-light-gray-meraqui text-blue-serene hover:bg-blue-200 focus:bg-blue-200 focus:outline-none'}
                    `}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="text-lg text-gray-800 mt-4 font-semibold animate-bounce-once">
                  Talla seleccionada: <span className="text-blue-serene font-bold">{selectedSize}</span>
                </p>
              )}
              {selectedSize === '' && (
                <p className="text-red-500 text-sm mt-3">Por favor, selecciona una talla antes de contactarnos.</p>
              )}
            </div>
          )}

          <button 
            onClick={() => {
              if (product.sizes && product.sizes.length > 0 && !selectedSize) {
                alert('Por favor, selecciona una talla antes de pedir por WhatsApp.');
                return;
              }
              window.open(whatsappLink, '_blank');
            }}
            className={`
              block w-full text-white-custom text-center py-4 rounded-lg no-underline text-xl font-semibold 
              transition-all duration-400 ease-in-out-expo hover:scale-[1.01] shadow-lg
              ${product.sizes && product.sizes.length > 0 && !selectedSize
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#25D366] hover:bg-[#1DAE54] cursor-pointer'}
            `}
            disabled={product.sizes && product.sizes.length > 0 && !selectedSize}
          >
            Pedir por WhatsApp
          </button>

          <div className="mt-8 font-sans">
            <div className="py-4 border-t border-gray-200">
              <h2 className="font-semibold text-lg text-gray-800">Precios Especiales y Materiales</h2>
              <div className="accordion-content pt-4 leading-relaxed text-gray-700">
                {product.materials && <p className="mb-2"><strong className="font-semibold text-gray-800">Materiales:</strong> {product.materials}</p>}
                <ul className="list-disc list-inside p-0 my-2 text-gray-700">
                  {product.wholesalePrice && <li className="mb-1"><strong className="font-semibold text-gray-800">Al por Mayor (desde 6 unidades):</strong> {formatPrice(product.wholesalePrice)}</li>}
                  {product.specialFabricPrice && <li><strong className="font-semibold text-gray-800">Opción Tela Fría:</strong> {formatPrice(product.specialFabricPrice)}</li>}
                </ul>
                <p className="text-sm text-gray-600 mt-4">Contáctanos por WhatsApp para realizar tus compras.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {recommendedProducts.length > 0 && (
        <div className="py-8 mt-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">También te podría interesar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
            {/* 2. CORRECCIÓN: Cambiar 'product' a 'producto' */}
            {recommendedProducts.map((recommendedProduct) => (
              <Link 
                to={`/producto/${recommendedProduct.id}`} 
                key={recommendedProduct.id} 
                className="block outline-none focus:ring-2 focus:ring-blue-serene focus:ring-offset-2 rounded-lg"
              >
                <ProductCard product={recommendedProduct} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;