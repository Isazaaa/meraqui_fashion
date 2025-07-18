import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center items-center mt-12 gap-3">
      {pageNumbers.map(number => (
        <button 
          key={number} 
          onClick={() => paginate(number)} 
          className={`bg-white-custom border border-gray-300 text-blue-serene font-semibold cursor-pointer rounded-lg min-w-[44px] h-[44px] transition-all duration-200
            hover:bg-gray-100 hover:border-gray-400
            ${currentPage === number ? 'bg-blue-serene text-white-custom border-blue-serene' : ''}`}
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
  // Considera reducir este número para que la paginación aparezca antes
  // si hay pocas columnas y las tarjetas son muy grandes.
  const productsPerPage = 12; // Un número razonable para más grandes (ej. 3 columnas x 4 filas)

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const title = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="py-8 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
      <header className="text-center py-8 md:py-12 border-b border-gray-200 mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-2">{title}</h1>
        <p className="text-lg md:text-xl text-gray-600">Descubre nuestra selección de prendas.</p>
      </header>
      
      {/* Cuadrícula de productos - AJUSTADA PARA TARJETAS MÁS GRANDES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12 px-0.5"> 
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg py-20">No hay productos en esta categoría por el momento.</p>
        )}
      </div>

      {filteredProducts.length > productsPerPage && (
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default CategoryPage;