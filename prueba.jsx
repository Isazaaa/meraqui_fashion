import React, { useState, useEffect } from 'react';
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
              ? 'bg-blue-serene border-4 border-blue-serene text-white-custom shadow-md transform scale-105'
              : 'bg-white-custom border-2 border-light-gray-meraqui text-blue-serene hover:bg-light-gray-meraqui hover:text-black-meraqui hover:border-black-meraqui'}
          `}
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
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para sidebar en móviles
  const productsPerPage = 12;

  // Resetear subcategoría a 'all' y página a 1 cuando cambie la categoría
  useEffect(() => {
    setSelectedSubcategory('all');
    setCurrentPage(1);
  }, [categoryName]);

  // Obtener subcategorías únicas para la categoría actual
  const subcategories = ['all', ...new Set(products
    .filter(product => product.category === categoryName)
    .map(product => product.subcategory)
  )];

  // Filtrar productos por categoría y subcategoría
  const filteredProducts = products.filter(product => 
    product.category === categoryName && 
    (selectedSubcategory === 'all' || product.subcategory === selectedSubcategory)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
    setIsSidebarOpen(false); // Cerrar sidebar en móviles al seleccionar
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const title = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : '';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar fijo a la izquierda */}
      <div className={`
        fixed top-0 left-0 h-screen w-64 bg-white-custom shadow-lg z-10
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex flex-col justify-center min-h-screen p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Subcategorías</h2>
          <div className="flex flex-col gap-3">
            {subcategories.map(subcategory => (
              <button
                key={subcategory}
                onClick={() => handleSubcategoryChange(subcategory)}
                className={`
                  relative w-full text-left px-4 py-2 rounded-lg font-medium text-base
                  transition-all duration-200 ease-in-out
                  ${selectedSubcategory === subcategory
                    ? 'bg-blue-serene text-white-custom shadow-md transform translate-x-2 scale-105'
                    : 'bg-white-custom border-2 border-light-gray-meraqui text-blue-serene hover:bg-light-gray-meraqui hover:text-black-meraqui hover:scale-105'}
                  before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-1
                  before:bg-blue-serene before:transform before:scale-y-0 before:origin-center
                  before:transition-transform before:duration-200 before:ease-in-out
                  ${selectedSubcategory === subcategory ? 'before:scale-y-100' : 'before:scale-y-0'}
                `}
              >
                {subcategory === 'all' ? 'Todos' : subcategory}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Botón para togglear sidebar en móviles */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <button
          className="px-4 py-2 bg-blue-serene text-white-custom rounded-lg"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? 'Cerrar' : 'Filtros'}
        </button>
      </div>

      {/* Contenido principal con margen para el sidebar */}
      <div className="flex-1 lg:ml-64 py-8 px-5 md:px-10 lg:px-20 max-w-[1400px] mx-auto">
        <header className="text-center py-8 md:py-12 border-b border-gray-200 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-gray-800 mb-2">{title}</h1>
          <p className="text-lg md:text-xl text-gray-600">Descubre nuestra selección de prendas.</p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-12">
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
    </div>
  );
};

export default CategoryPage;