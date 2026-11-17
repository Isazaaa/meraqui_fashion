import React from 'react';
import { FaTimes } from 'react-icons/fa';

/** Removable chips for the active filters plus a "Limpiar filtros" action. */
const ActiveFilters = ({ chips, onClear }) => {
  if (chips.length === 0) return null;

  return (
    <ul className="mb-6 flex flex-wrap items-center gap-2" aria-label="Filtros activos">
      {chips.map((chip) => (
        <li key={chip.key}>
          <button
            type="button"
            onClick={chip.remove}
            aria-label={`Quitar filtro ${chip.label}`}
            className="inline-flex min-h-10 items-center gap-2 border border-gray-300 px-3 py-1.5 text-xs text-black-meraqui transition-colors duration-200 hover:border-black-meraqui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
          >
            {chip.label}
            <FaTimes aria-hidden="true" className="h-2.5 w-2.5 text-gray-500" />
          </button>
        </li>
      ))}
      <li>
        <button
          type="button"
          onClick={onClear}
          className="min-h-10 px-2 py-1.5 text-xs text-gray-600 underline underline-offset-4 transition-colors hover:text-black-meraqui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
        >
          Limpiar filtros
        </button>
      </li>
    </ul>
  );
};

export default ActiveFilters;
