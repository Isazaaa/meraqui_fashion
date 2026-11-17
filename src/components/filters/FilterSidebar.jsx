import React from 'react';
import FilterGroups from './FilterGroups';

/** Sticky desktop sidebar (hidden below lg; the drawer takes over there). */
const FilterSidebar = ({ hasActiveFilters, onClear, ...groupProps }) => (
  <aside aria-label="Filtros" className="hidden lg:block">
    <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">Filtrar</p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-gray-500 underline underline-offset-4 transition-colors hover:text-black-meraqui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
          >
            Limpiar
          </button>
        )}
      </div>
      <FilterGroups {...groupProps} />
    </div>
  </aside>
);

export default FilterSidebar;
