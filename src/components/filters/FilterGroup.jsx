import React, { useId, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

/** Collapsible filter section with a small uppercase label. */
export const FilterGroup = ({ title, defaultOpen = true, children }) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <section className="border-b border-gray-200 py-5 first:pt-0 last:border-b-0">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-h-11 w-full items-center justify-between text-xs font-semibold uppercase tracking-[0.14em] text-black-meraqui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
        >
          {title}
          <FaChevronDown
            aria-hidden="true"
            className={`h-2.5 w-2.5 text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </h3>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
        inert={!open}
      >
        <div className="overflow-hidden">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </section>
  );
};

/** Checkbox / radio row with a muted count. Native input keeps it keyboard operable. */
export const FilterOption = ({ type = 'checkbox', name, label, count, checked, disabled, onChange }) => (
  <label
    className={`group flex min-h-11 items-center gap-3 py-2 text-sm ${
      disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
    }`}
  >
    <input
      type={type}
      name={name}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      className="peer sr-only"
    />
    <span
      aria-hidden="true"
      className={`flex h-4 w-4 shrink-0 items-center justify-center border border-gray-400 bg-white-custom transition-colors duration-200 group-hover:border-black-meraqui peer-focus-visible:ring-2 peer-focus-visible:ring-blue-serene peer-focus-visible:ring-offset-2 peer-checked:border-black-meraqui peer-checked:[&>*]:opacity-100 ${
        type === 'radio' ? 'rounded-full' : 'peer-checked:bg-black-meraqui'
      }`}
    >
      {type === 'radio' ? (
        <span className="h-2 w-2 rounded-full bg-black-meraqui opacity-0 transition-opacity duration-200" />
      ) : (
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white opacity-0 transition-opacity duration-200" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2.5 6.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <span className="flex-1 text-gray-700 transition-colors duration-200 group-hover:text-black-meraqui peer-checked:font-medium peer-checked:text-black-meraqui">
      {label}
    </span>
    {count !== undefined && (
      <span className="text-xs tabular-nums text-gray-400">{count}</span>
    )}
  </label>
);

/** Compact square size chip (checkbox semantics). */
export const SizeChip = ({ label, checked, disabled, onChange }) => (
  <label className={`relative ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}>
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      className="peer sr-only"
      aria-label={`Talla ${label}`}
    />
    <span
      aria-hidden="true"
      className="flex h-10 min-w-11 items-center justify-center border border-gray-300 px-2 text-xs font-medium text-gray-700 transition-colors duration-200 hover:border-black-meraqui peer-checked:border-black-meraqui peer-checked:bg-black-meraqui peer-checked:text-white-custom peer-focus-visible:ring-2 peer-focus-visible:ring-blue-serene peer-focus-visible:ring-offset-2"
    >
      {label}
    </span>
  </label>
);
