import React, { useState, useMemo, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './ProductDetailAccordion.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = products.find(p => p.id == productId);

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

  // MODIFICACIÓN 1: Usar un objeto para el estado de las tallas
  // Esto permite almacenar múltiples tallas por producto (e.g., para dúos).
  const [selectedSizes, setSelectedSizes] = useState({});

  // Nuevo estado para la opción seleccionada del dúo (e.g., 'Hombre', 'Mujer').
  // Útil para saber qué conjunto de tallas mostrar/editar.
  const [selectedDuoOption, setSelectedDuoOption] = useState('');

  // Efecto para inicializar las tallas del dúo al cambiar de producto.
  // Esto es crucial para que al entrar a un dúo, se inicialice correctamente.
  useEffect(() => {
    if (product.duoOptions && product.duoOptions.length > 0) {
      const initialSizes = product.duoOptions.reduce((acc, option) => {
        acc[option.name] = '';
        return acc;
      }, {});
      setSelectedSizes(initialSizes);
      setSelectedDuoOption(product.duoOptions[0].name); // Seleccionar la primera opción por defecto
    } else {
      setSelectedSizes({ single: '' }); // Para productos que no son dúo
      setSelectedDuoOption('single');
    }
  }, [productId, product]);

  const formatPrice = (price) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

  // MODIFICACIÓN 2: Actualizar la lógica de selección de talla
  const handleSizeSelect = (size) => {
    setSelectedSizes(prevSizes => ({
      ...prevSizes,
      [selectedDuoOption]: size
    }));
  };

  // Lógica para el botón de WhatsApp
  const productNameForWhatsApp = encodeURIComponent(product.name);
  const isDuoProduct = product.duoOptions && product.duoOptions.length > 0;
  const allSizesSelected = isDuoProduct
    ? Object.values(selectedSizes).every(size => size !== '')
    : selectedSizes.single !== '';

  const sizesForWhatsApp = isDuoProduct
    ? Object.entries(selectedSizes)
        .map(([optionName, size]) => `${optionName}: ${size}`)
        .join(', ')
    : selectedSizes.single;

  const whatsappLink = `https://wa.me/573205646710?text=¡Hola!%20Estoy%20interesado%20en%20el%20producto%20*${productNameForWhatsApp}*.%0A%0ATallas:%20${encodeURIComponent(sizesForWhatsApp)}.%0A%0APor%20favor,%20dame%20más%20información.`;

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const recommendedProducts = useMemo(() => {
    return shuffleArray(
      products.filter(p => p.category === product.category && p.id !== product.id)
    ).slice(0, 4);
  }, [productId, product.category, product.id]);

  // Si el producto es un dúo, obtenemos las tallas de la opción seleccionada.
  const sizesToRender = isDuoProduct
    ? product.duoOptions.find(opt => opt.name === selectedDuoOption)?.sizes || []
    : product.sizes || [];

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

          {/* MODIFICACIÓN 3: Lógica para mostrar las opciones del dúo */}
          {isDuoProduct && (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-4 text-lg text-gray-800 border-b border-gray-200 pb-2">
                Selecciona la prenda
              </h2>
              <div className="flex flex-wrap gap-3">
                {product.duoOptions.map(option => (
                  <button
                    key={option.name}
                    className={`
                      size-button border-2 font-medium py-2 px-4 rounded-full cursor-pointer 
                      transition-all duration-400 ease-in-out-expo text-base
                      ${selectedDuoOption === option.name 
                        ? 'bg-blue-serene border-blue-serene text-white-custom shadow-lg'
                        : 'bg-white-custom border-light-gray-meraqui text-blue-serene hover:bg-blue-200 focus:bg-blue-200 focus:outline-none'}
                    `}
                    onClick={() => setSelectedDuoOption(option.name)}
                  >
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MODIFICACIÓN 4: Lógica para las tallas, ahora usando sizesToRender */}
          {sizesToRender.length > 0 && (
            <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm">
              <h2 className="font-semibold mb-4 text-lg text-gray-800 border-b border-gray-200 pb-2">
                Selecciona tu Talla
              </h2>
              <div className="flex flex-wrap gap-3">
                {sizesToRender.map(size => (
                  <button
                    key={size}
                    aria-selected={
                      (isDuoProduct && selectedSizes[selectedDuoOption] === size) ||
                      (!isDuoProduct && selectedSizes.single === size)
                    }
                    className={`
                      size-button border-2 font-medium py-2 px-4 rounded-full cursor-pointer 
                      transition-all duration-400 ease-in-out-expo text-base
                      ${((isDuoProduct && selectedSizes[selectedDuoOption] === size) || (!isDuoProduct && selectedSizes.single === size))
                        ? 'bg-blue-serene border-blue-serene text-white-custom shadow-lg transform scale-110'
                        : 'bg-white-custom border-light-gray-meraqui text-blue-serene hover:bg-blue-200 focus:bg-blue-200 focus:outline-none'}
                    `}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {/* MODIFICACIÓN 5: Mensaje de talla seleccionada */}
              {isDuoProduct && selectedSizes[selectedDuoOption] && (
                <p className="text-lg text-gray-800 mt-4 font-semibold animate-bounce-once">
                  Talla seleccionada para {selectedDuoOption}: <span className="text-blue-serene font-bold">{selectedSizes[selectedDuoOption]}</span>
                </p>
              )}
              {!isDuoProduct && selectedSizes.single && (
                <p className="text-lg text-gray-800 mt-4 font-semibold animate-bounce-once">
                  Talla seleccionada: <span className="text-blue-serene font-bold">{selectedSizes.single}</span>
                </p>
              )}
              {!allSizesSelected && (
                <p className="text-red-500 text-sm mt-3">Por favor, selecciona {isDuoProduct ? 'las tallas de cada prenda' : 'una talla'} antes de contactarnos.</p>
              )}
            </div>
          )}

          {/* MODIFICACIÓN 6: Actualizar la condición del botón de WhatsApp */}
          <button 
            onClick={() => {
              if (!allSizesSelected) {
                alert('Por favor, selecciona las tallas antes de pedir por WhatsApp.');
                return;
              }
              window.open(whatsappLink, '_blank');
            }}
            className={`
              block w-full text-white-custom text-center py-4 rounded-lg no-underline text-xl font-semibold 
              transition-all duration-400 ease-in-out-expo hover:scale-[1.01] shadow-lg
              ${!allSizesSelected
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#25D366] hover:bg-[#1DAE54] cursor-pointer'}
            `}
            disabled={!allSizesSelected}
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