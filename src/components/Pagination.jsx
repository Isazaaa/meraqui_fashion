import React from 'react';

const Pagination = ({ totalPages, paginate, currentPage }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Paginación" className="mt-14 flex items-center justify-center gap-2">
      {pageNumbers.map((number) => {
        const isCurrent = currentPage === number;
        return (
          <button
            key={number}
            type="button"
            onClick={() => paginate(number)}
            aria-label={`Ir a la página ${number}`}
            aria-current={isCurrent ? 'page' : undefined}
            className={`flex h-10 w-10 items-center justify-center text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2 ${
              isCurrent
                ? 'bg-black-meraqui text-white-custom'
                : 'border border-transparent text-gray-600 hover:border-light-gray-meraqui hover:text-black-meraqui'
            }`}
          >
            {number}
          </button>
        );
      })}
    </nav>
  );
};

export default Pagination;
