import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaSlidersH } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import FilterSidebar from '../components/filters/FilterSidebar';
import MobileFilterDrawer from '../components/filters/MobileFilterDrawer';
import ActiveFilters from '../components/filters/ActiveFilters';
import SortSelect from '../components/filters/SortSelect';
import useProductFilters from '../hooks/useProductFilters';
import { capitalize } from '../utils/productFilters';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const {
    filters,
    facets,
    results,
    pageItems,
    page,
    totalPages,
    isUnknownCategory,
    activeFilters,
    setSubcategory,
    toggleSize,
    setPrice,
    setSort,
    setPage,
    clearFilters,
  } = useProductFilters(categoryName);

  const hasActiveFilters = activeFilters.length > 0;
  const title = categoryName ? capitalize(categoryName) : 'Categoría';

  // Props shared by the desktop sidebar and the mobile drawer.
  const groupProps = {
    filters,
    facets,
    onSubcategory: setSubcategory,
    onToggleSize: toggleSize,
    onPrice: setPrice,
  };

  if (isUnknownCategory) {
    return (
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 pb-24 pt-32 text-center md:px-10">
        <h1 className="text-2xl font-semibold tracking-tight text-black-meraqui md:text-3xl">Categoría no encontrada</h1>
        <p className="mt-2 text-sm text-gray-500">La categoría que buscas no existe o ya no está disponible.</p>
        <Link
          to="/"
          className="mt-8 bg-black-meraqui px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white-custom transition-colors duration-200 hover:bg-blue-serene focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-20 sm:pt-8 md:px-10 lg:px-16">
      <header className="pb-8 pt-4 md:pb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-black-meraqui md:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">Descubre nuestra selección de prendas.</p>
      </header>

      {/* Toolbar: count · mobile filter button · sort */}
      {/* Mobile: count on its own row, then filter button + sort side by side. */}
      <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-3 border-y border-gray-200 py-3 sm:gap-x-4">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
          className="order-2 inline-flex min-h-11 flex-1 items-center justify-center gap-2 border border-black-meraqui px-4 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-black-meraqui transition-colors duration-200 hover:bg-black-meraqui hover:text-white-custom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2 sm:order-1 sm:flex-none lg:hidden"
        >
          <FaSlidersH aria-hidden="true" className="h-3 w-3" />
          Filtrar
          {hasActiveFilters && <span className="tabular-nums">({activeFilters.length})</span>}
        </button>
        <p className="order-1 w-full whitespace-nowrap text-sm text-gray-500 sm:order-2 sm:mr-auto sm:w-auto" aria-live="polite">
          {results.length} {results.length === 1 ? 'producto' : 'productos'}
        </p>
        <SortSelect className="order-3 flex-1 sm:flex-none" value={filters.sort} onChange={setSort} />
      </div>

      <ActiveFilters chips={activeFilters} onClear={clearFilters} />

      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
        <FilterSidebar hasActiveFilters={hasActiveFilters} onClear={clearFilters} {...groupProps} />

        <div>
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-base text-black-meraqui">No encontramos productos con estos filtros.</p>
              <p className="mt-1 text-sm text-gray-500">Prueba quitando alguno para ver más resultados.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 bg-black-meraqui px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white-custom transition-colors duration-200 hover:bg-blue-serene focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
              {pageItems.map((product) => (
                <Link
                  key={product.id}
                  to={`/producto/${product.id}`}
                  className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
                >
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
          )}

          <Pagination
            totalPages={totalPages}
            paginate={setPage}
            currentPage={page}
          />
        </div>
      </div>

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        resultCount={results.length}
        hasActiveFilters={hasActiveFilters}
        onClear={clearFilters}
        {...groupProps}
      />
    </div>
  );
};

export default CategoryPage;
