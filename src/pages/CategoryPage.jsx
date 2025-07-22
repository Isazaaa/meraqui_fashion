import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link, useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers.length <= 1) {
    return null;
  }

  return (
    <nav className="pagination-container">
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className={`pagination-button ${currentPage === number ? 'active' : 'inactive'}`}
          aria-label={`Ir a la página ${number}`}
          aria-current={currentPage === number ? 'page' : undefined}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const productsPerPage = 12;

  // Inicializar estados
  const [currentPage, setCurrentPage] = useState(() => {
    const queryPage = searchParams.get('page');
    const savedPage = sessionStorage.getItem(`category_${categoryName}_page`);
    const statePage = location.state?.currentPage;
    console.log('Initializing currentPage:', { queryPage, savedPage, statePage });
    return Number(queryPage) || Number(savedPage) || Number(statePage) || 1;
  });
  const [selectedSubcategory, setSelectedSubcategory] = useState(() => {
    const querySubcategory = searchParams.get('subcategory');
    const savedSubcategory = sessionStorage.getItem(`category_${categoryName}_subcategory`);
    const stateSubcategory = location.state?.selectedSubcategory;
    console.log('Initializing selectedSubcategory:', { querySubcategory, savedSubcategory, stateSubcategory });
    return querySubcategory || savedSubcategory || stateSubcategory || 'all';
  });

  // Obtener subcategorías únicas, asegurando que "all" esté primero
  const subcategories = ['all', ...new Set(products
    .filter(product => product.category === categoryName)
    .map(product => product.subcategory)
    .filter(Boolean)
  )].sort((a, b) => a === 'all' ? -1 : b === 'all' ? 1 : a.localeCompare(b));
  console.log('Subcategories for', categoryName, ':', subcategories);

  // Contar productos por subcategoría
  const subcategoryCounts = subcategories.reduce((acc, subcategory) => {
    const count = subcategory === 'all'
      ? products.filter(product => product.category === categoryName).length
      : products.filter(product => product.category === categoryName && product.subcategory === subcategory).length;
    return { ...acc, [subcategory]: count };
  }, {});
  console.log('Subcategory counts:', subcategoryCounts);

  // Filtrar productos
  const filteredProducts = products.filter(product =>
    product.category === categoryName &&
    (selectedSubcategory === 'all' || product.subcategory === selectedSubcategory)
  );
  console.log('Filtered products:', filteredProducts.map(p => ({ id: p.id, name: p.name })));

  // Calcular productos a mostrar
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  console.log('Rendering products for page', currentPage, ':', currentProducts.map(p => ({ id: p.id, name: p.name })));

  // Validar currentPage
  const maxPage = Math.ceil(filteredProducts.length / productsPerPage);
  console.log('Max pages:', maxPage, 'Current page:', currentPage);
  useEffect(() => {
    if (currentPage > maxPage && maxPage > 0) {
      console.log('Adjusting currentPage from', currentPage, 'to', maxPage);
      setCurrentPage(maxPage);
      setSearchParams({ page: maxPage.toString(), subcategory: selectedSubcategory }, { replace: true });
      sessionStorage.setItem(`category_${categoryName}_page`, maxPage.toString());
    }
  }, [currentPage, maxPage, selectedSubcategory, setSearchParams, categoryName]);

  // Actualizar query params y sessionStorage
  useEffect(() => {
    setSearchParams({ page: currentPage.toString(), subcategory: selectedSubcategory }, { replace: true });
    sessionStorage.setItem(`category_${categoryName}_page`, currentPage.toString());
    sessionStorage.setItem(`category_${categoryName}_subcategory`, selectedSubcategory);
    console.log('Updated query params and sessionStorage:', { currentPage, selectedSubcategory });
  }, [currentPage, selectedSubcategory, categoryName, setSearchParams]);

  // Resetear estados solo si no hay valores previos
  useEffect(() => {
    const queryPage = searchParams.get('page');
    const querySubcategory = searchParams.get('subcategory');
    if (!queryPage && !querySubcategory && !sessionStorage.getItem(`category_${categoryName}_page`)) {
      console.log('No previous state found, resetting for category:', categoryName);
      setCurrentPage(1);
      setSelectedSubcategory('all');
      setSearchParams({ page: '1', subcategory: 'all' }, { replace: true });
      sessionStorage.setItem(`category_${categoryName}_page`, '1');
      sessionStorage.setItem(`category_${categoryName}_subcategory`, 'all');
    }
  }, [categoryName, setSearchParams]);

  // Restaurar desde location.state
  useEffect(() => {
    if (location.state?.currentPage || location.state?.selectedSubcategory) {
      console.log('Restoring from location.state:', location.state);
      const maxPage = Math.ceil(filteredProducts.length / productsPerPage);
      if (location.state?.currentPage && Number(location.state.currentPage) <= maxPage) {
        setCurrentPage(Number(location.state.currentPage));
      }
      if (location.state?.selectedSubcategory && subcategories.includes(location.state.selectedSubcategory)) {
        setSelectedSubcategory(location.state.selectedSubcategory);
      }
    }
  }, [location.state, filteredProducts.length]);

  const paginate = (pageNumber) => {
    console.log('Paginating to page:', pageNumber);
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber.toString(), subcategory: selectedSubcategory }, { replace: true });
    sessionStorage.setItem(`category_${categoryName}_page`, pageNumber.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubcategoryChange = (subcategory) => {
    console.log('Changing subcategory to:', subcategory);
    setSelectedSubcategory(subcategory);
    setCurrentPage(1);
    setSearchParams({ page: '1', subcategory: subcategory }, { replace: true });
    sessionStorage.setItem(`category_${categoryName}_subcategory`, subcategory);
    sessionStorage.setItem(`category_${categoryName}_page`, '1');
  };

  const title = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : 'Categoría';

  return (
    <div className="category-page-container">
      <header className="category-header">
        <h1 className="category-title">{title}</h1>
        <p className="category-description">Descubre nuestra selección de prendas.</p>
      </header>

      <div className="subcategory-filters-container">
        {subcategories.map(subcategory => (
          <button
            key={subcategory}
            onClick={() => handleSubcategoryChange(subcategory)}
            className={`subcategory-button ${selectedSubcategory === subcategory ? 'active' : 'inactive'}`}
            aria-label={`Filtrar por ${subcategory === 'all' ? 'todas las subcategorías' : subcategory}`}
            aria-current={selectedSubcategory === subcategory ? 'true' : 'false'}
            title={`${subcategory === 'all' ? 'Todos' : subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} (${subcategoryCounts[subcategory]} productos)`}
          >
            <span>{subcategory === 'all' ? 'Todos' : subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}</span>
            <span className="subcategory-count">{subcategoryCounts[subcategory]}</span>
          </button>
        ))}
      </div>

      {currentProducts.length === 0 && (
        <div className="no-products-message">
          <p className="no-products-text">Lo sentimos, no hay productos disponibles en esta subcategoría por el momento. 😟</p>
          <button
            onClick={() => handleSubcategoryChange('all')}
            className="no-products-button"
          >
            Ver todos los productos
          </button>
        </div>
      )}

      <div className="products-grid">
        {currentProducts.map((product) => (
          <Link
            key={product.id}
            to={`/producto/${product.id}?page=${currentPage}&subcategory=${encodeURIComponent(selectedSubcategory)}`}
            state={{ currentPage, selectedSubcategory }}
            className="product-link"
          >
            <ProductCard product={product} />
          </Link>
        ))}
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