import React, { useState } from 'react'; // 1. Importa useState
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

// 2. Componente simple para la paginación (puedes moverlo a su propio archivo si quieres)
const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      {pageNumbers.map(number => (
        <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
          {number}
        </button>
      ))}
    </nav>
  );
};


const CategoryPage = () => {
  const { categoryName } = useParams();
  
  // 3. Lógica de estado y paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 14; // El límite que mencionaste

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  // Calcular los productos a mostrar en la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const title = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);

  return (
    <div className="category-page-container">
      <header className="category-header">
        <h1>{title}</h1>
        <p>Descubre nuestra selección de prendas.</p>
      </header>
      
      <div className="product-grid">
        {currentProducts.length > 0 ? (
          // 4. Mostramos solo los productos de la página actual
          currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No hay productos en esta categoría por el momento.</p>
        )}
      </div>

      {/* 5. Mostramos la paginación SOLO si hay más productos que el límite por página */}
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