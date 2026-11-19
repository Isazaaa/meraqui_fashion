import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import FilterGroups from './FilterGroups';

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Slide-in filter drawer for < lg screens. Filters apply live; the footer
 * button just closes the drawer showing the result count.
 * Closes with Esc, overlay click or the close button; locks body scroll.
 */
const MobileFilterDrawer = ({ open, onClose, resultCount, hasActiveFilters, onClear, ...groupProps }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      // Keep focus inside the drawer.
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    // The drawer is hidden from lg up: close it so scroll lock and focus trap
    // do not outlive the viewport change.
    const mq = window.matchMedia('(min-width: 1024px)');
    const onBreakpoint = (e) => {
      if (e.matches) onCloseRef.current();
    };
    mq.addEventListener('change', onBreakpoint);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      mq.removeEventListener('change', onBreakpoint);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden" inert={!open}>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[1100] bg-black-meraqui/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filtros"
        className={`fixed inset-y-0 left-0 z-[1101] flex w-[88%] max-w-sm flex-col bg-white-custom transition-transform duration-300 ease-out ${
          open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-black-meraqui">Filtrar</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar filtros"
            className="-mr-3 inline-flex h-11 w-11 items-center justify-center text-gray-600 transition-colors hover:text-black-meraqui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <FilterGroups {...groupProps} />
        </div>

        <div className="flex gap-3 border-t border-gray-200 px-5 py-4">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClear}
              className="border border-gray-300 px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] text-black-meraqui transition-colors hover:border-black-meraqui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
            >
              Limpiar
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-black-meraqui px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] text-white-custom transition-colors hover:bg-blue-serene focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
          >
            Ver {resultCount} {resultCount === 1 ? 'producto' : 'productos'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileFilterDrawer;
