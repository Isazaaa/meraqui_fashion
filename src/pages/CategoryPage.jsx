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
        return Number(queryPage) || Number(savedPage) || 1;
    });
    const [selectedSubcategory, setSelectedSubcategory] = useState(() => {
        const querySubcategory = searchParams.get('subcategory');
        const savedSubcategory = sessionStorage.getItem(`category_${categoryName}_subcategory`);
        return querySubcategory || savedSubcategory || 'all';
    });

    // Obtener subcategorías únicas, asegurando que "all" esté primero
    const subcategories = ['all', ...new Set(products
        .filter(product => product.category === categoryName)
        .map(product => product.subcategory)
        .filter(Boolean)
    )].sort((a, b) => a === 'all' ? -1 : b === 'all' ? 1 : a.localeCompare(b));

    // Contar productos por subcategoría
    const subcategoryCounts = subcategories.reduce((acc, subcategory) => {
        const count = subcategory === 'all'
            ? products.filter(product => product.category === categoryName).length
            : products.filter(product => product.category === categoryName && product.subcategory === subcategory).length;
        return { ...acc, [subcategory]: count };
    }, {});

    // Filtrar productos
    const filteredProducts = products.filter(product =>
        product.category === categoryName &&
        (selectedSubcategory === 'all' || product.subcategory === selectedSubcategory)
    );

    // Calcular productos a mostrar
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Validar currentPage
    const maxPage = Math.ceil(filteredProducts.length / productsPerPage);
    useEffect(() => {
        if (currentPage > maxPage && maxPage > 0) {
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
    }, [currentPage, selectedSubcategory, categoryName, setSearchParams]);

    // Restaurar desde location.state y resetear si no hay valores previos
    useEffect(() => {
        const queryPage = searchParams.get('page');
        const querySubcategory = searchParams.get('subcategory');
        const savedPage = sessionStorage.getItem(`category_${categoryName}_page`);
        const savedSubcategory = sessionStorage.getItem(`category_${categoryName}_subcategory`);

        if (location.state?.currentPage || location.state?.selectedSubcategory) {
            const maxPageForState = Math.ceil(
                products.filter(p => p.category === categoryName &&
                    (location.state.selectedSubcategory === 'all' || p.subcategory === location.state.selectedSubcategory)
                ).length / productsPerPage
            );

            if (location.state.currentPage && Number(location.state.currentPage) <= maxPageForState) {
                setCurrentPage(Number(location.state.currentPage));
            }
            if (location.state.selectedSubcategory && subcategories.includes(location.state.selectedSubcategory)) {
                setSelectedSubcategory(location.state.selectedSubcategory);
            }
            // Borra el estado después de usarlo para evitar que se aplique en futuras visitas
            window.history.replaceState({}, document.title); 

        } else if (!queryPage && !querySubcategory && !savedPage && !savedSubcategory) {
            setCurrentPage(1);
            setSelectedSubcategory('all');
            setSearchParams({ page: '1', subcategory: 'all' }, { replace: true });
            sessionStorage.setItem(`category_${categoryName}_page`, '1');
            sessionStorage.setItem(`category_${categoryName}_subcategory`, 'all');
        }
    }, [categoryName, location.state, productsPerPage, setSearchParams, subcategories, products]);


    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSearchParams({ page: pageNumber.toString(), subcategory: selectedSubcategory }, { replace: true });
        sessionStorage.setItem(`category_${categoryName}_page`, pageNumber.toString());
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubcategoryChange = (subcategory) => {
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