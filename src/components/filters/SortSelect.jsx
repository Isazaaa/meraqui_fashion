import React from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { SORT_OPTIONS } from '../../utils/productFilters';

/** Native select (best mobile / a11y behavior) with a custom, minimal skin. */
const SortSelect = ({ value, onChange, className = '' }) => (
  <label className={`relative flex min-w-0 items-center gap-3 text-sm ${className}`}>
    <span className="hidden whitespace-nowrap text-gray-500 sm:inline">Ordenar por</span>
    <span className="relative min-w-0 flex-1">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full cursor-pointer appearance-none truncate border border-gray-300 bg-white-custom py-2.5 pl-4 pr-10 text-sm text-black-meraqui transition-colors duration-200 hover:border-black-meraqui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
      >
        {Object.entries(SORT_OPTIONS).map(([key, { label }]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <FaChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-2.5 w-2.5 -translate-y-1/2 text-gray-600"
      />
    </span>
  </label>
);

export default SortSelect;
