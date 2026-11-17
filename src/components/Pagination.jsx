import React, { useSyncExternalStore } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ELLIPSIS = 'ellipsis';
const SM_QUERY = '(min-width: 640px)';

const subscribeToSm = (callback) => {
  const mq = window.matchMedia(SM_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
};
const getSmSnapshot = () => window.matchMedia(SM_QUERY).matches;

/**
 * Compact page list: always first, last and current ±siblings, with ellipses
 * collapsing the gaps (e.g. 1 … 4 5 6 … 12). A gap of exactly one page is
 * rendered as the page itself so the list never hides a single number.
 */
function getPageItems(current, total, siblings) {
  // Short lists fit entirely: no point collapsing them.
  if (total <= siblings * 2 + 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total]);
  for (let p = current - siblings; p <= current + siblings; p += 1) {
    if (p >= 1 && p <= total) pages.add(p);
  }
  const sorted = [...pages].sort((a, b) => a - b);

  const items = [];
  sorted.forEach((page, i) => {
    const prev = sorted[i - 1];
    if (prev !== undefined) {
      if (page - prev === 2) items.push(prev + 1);
      else if (page - prev > 2) items.push(`${ELLIPSIS}-${prev}`);
    }
    items.push(page);
  });
  return items;
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2';

const Pagination = ({ totalPages, currentPage, totalItems, perPage, paginate }) => {
  const isSm = useSyncExternalStore(subscribeToSm, getSmSnapshot, () => true);
  if (totalPages <= 1) return null;

  const items = getPageItems(currentPage, totalPages, isSm ? 1 : 0);
  const first = (currentPage - 1) * perPage + 1;
  const last = Math.min(currentPage * perPage, totalItems);
  const atStart = currentPage <= 1;
  const atEnd = currentPage >= totalPages;

  const stepClass = `inline-flex h-11 min-w-11 items-center justify-center gap-2 px-3 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 ${focusRing}`;
  const stepEnabled = 'text-black-meraqui hover:bg-gray-100';
  const stepDisabled = 'cursor-not-allowed text-gray-300';

  return (
    <nav aria-label="Paginación" className="mt-14 border-t border-gray-200 pt-6">
      <ol className="flex items-center justify-center gap-1 sm:gap-2">
        <li>
          <button
            type="button"
            onClick={() => paginate(currentPage - 1)}
            disabled={atStart}
            aria-label="Página anterior"
            className={`${stepClass} ${atStart ? stepDisabled : stepEnabled}`}
          >
            <FaChevronLeft aria-hidden="true" className="h-3 w-3" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
        </li>

        {items.map((item) => {
          if (typeof item === 'string') {
            return (
              <li key={item} aria-hidden="true" className="flex h-11 w-6 items-center justify-center text-sm text-gray-400 sm:w-8">
                …
              </li>
            );
          }
          const isCurrent = item === currentPage;
          return (
            <li key={item}>
              <button
                type="button"
                onClick={() => paginate(item)}
                aria-label={`Ir a la página ${item}`}
                aria-current={isCurrent ? 'page' : undefined}
                className={`inline-flex h-11 min-w-11 items-center justify-center px-2 text-sm font-medium tabular-nums transition-colors duration-200 ${focusRing} ${
                  isCurrent
                    ? 'bg-black-meraqui text-white-custom'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-black-meraqui'
                }`}
              >
                {item}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            onClick={() => paginate(currentPage + 1)}
            disabled={atEnd}
            aria-label="Página siguiente"
            className={`${stepClass} ${atEnd ? stepDisabled : stepEnabled}`}
          >
            <span className="hidden sm:inline">Siguiente</span>
            <FaChevronRight aria-hidden="true" className="h-3 w-3" />
          </button>
        </li>
      </ol>

      <p className="mt-4 text-center text-xs uppercase tracking-[0.14em] text-gray-500" aria-live="polite">
        Mostrando {first}–{last} de {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
      </p>
    </nav>
  );
};

export default Pagination;
