import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

// --- MEJOR PRÁCTICA: Pagination se define fuera de CategoryPage ---
// Así no se vuelve a crear en cada renderizado y el código es más limpio.
const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Si solo hay una página o menos, no mostramos los botones.
  if (pageNumbers.length <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center items-center mt-12 gap-3">
      {pageNumbers.map(number => (
        <button 
          key={number} 
          onClick={() => paginate(number)} 
          // Clases de Tailwind para los botones de paginación
          className={`bg-white border border-gray-300 text-blue-serene font-semibold cursor-pointer rounded-lg min-w-[44px] h-[44px] transition-all duration-200
            hover:bg-gray-100 hover:border-gray-400
            ${currentPage === number ? 'bg-blue-serene text-white border-blue-serene' : ''}`}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};


const CategoryPage = () => {
  const { categoryName } = useParams();
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // =================================================================
  // === AQUÍ ESTÁ LA LÍNEA QUE FALTABA: Definimos la función paginate ===
  // =================================================================
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const title = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : '';

  return (
    <div className="py-8 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
      <header className="text-center py-8 md:py-12 border-b border-gray-200 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-2">{title}</h1>
        <p className="text-lg md:text-xl text-gray-600">Descubre nuestra selección de prendas.</p>
      </header>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12"> 
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg py-20">No hay productos en esta categoría por el momento.</p>
        )}
      </div>

      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default CategoryPage;