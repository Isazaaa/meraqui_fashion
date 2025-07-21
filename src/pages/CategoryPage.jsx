import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length <= 1) {
    return null;
  }

  return (
    <nav className="flex justify-center items-center mt-12 gap-3">
      {pageNumbers.map(number => (
        <button 
          key={number} 
          onClick={() => paginate(number)} 
          className={`
            bg-white-custom font-semibold cursor-pointer rounded-lg 
            min-w-[48px] h-[48px] text-lg
            transition-all duration-300 ease-in-out

            ${currentPage === number 
              ? 'bg-blue-serene border-4 border-blue-serene text-white-custom shadow-md transform scale-105' // ESTILO ACTIVO MEJORADO: ¡Borde de 4px!
              : 'bg-white-custom border-2 border-light-gray-meraqui text-blue-serene hover:bg-light-gray-meraqui hover:text-black-meraqui hover:border-black-meraqui'} 
          `}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

// ... (El resto de CategoryPage.jsx permanece igual)

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