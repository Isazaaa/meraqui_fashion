import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import {
  PRICE_RANGES,
  SORT_OPTIONS,
  capitalize,
  compareSizes,
  filterProducts,
  hasKey,
} from '../utils/productFilters';

const DEFAULT_SORT = 'featured';

/**
 * Filter / sort / pagination state for a category. The URL query string is the
 * single source of truth (?subcategory, ?sizes, ?price, ?sort, ?page), so
 * filters are shareable and survive back/forward navigation.
 */
export default function useProductFilters(categoryName, perPage = 12) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryProducts = useMemo(
    () => products.filter((p) => p.category === categoryName),
    [categoryName]
  );

  const subcategoryNames = useMemo(
    () =>
      [...new Set(categoryProducts.map((p) => p.subcategory).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b)
      ),
    [categoryProducts]
  );

  const sizeNames = useMemo(
    () => [...new Set(categoryProducts.flatMap((p) => p.sizes || []))].sort(compareSizes),
    [categoryProducts]
  );

  // --- Filters parsed from the URL (invalid values fall back to defaults) ---
  const filters = useMemo(() => {
    const sub = searchParams.get('subcategory');
    const price = searchParams.get('price');
    const sort = searchParams.get('sort');
    const sizes = (searchParams.get('sizes') || '').split(',').filter((s) => sizeNames.includes(s));
    return {
      subcategory: sub && subcategoryNames.includes(sub) ? sub : 'all',
      sizes,
      price: price && hasKey(PRICE_RANGES, price) ? price : 'all',
      sort: sort && hasKey(SORT_OPTIONS, sort) ? sort : DEFAULT_SORT,
    };
  }, [searchParams, subcategoryNames, sizeNames]);

  // --- Results ---
  const results = useMemo(
    () => filterProducts(categoryProducts, filters).sort(SORT_OPTIONS[filters.sort].compare),
    [categoryProducts, filters]
  );

  const totalPages = Math.max(1, Math.ceil(results.length / perPage));
  const requestedPage = parseInt(searchParams.get('page'), 10) || 1;
  const page = Math.min(Math.max(1, requestedPage), totalPages);
  const pageItems = results.slice((page - 1) * perPage, page * perPage);

  // --- Facets with counts that respect the other active filters ---
  const facets = useMemo(() => {
    const bySub = filterProducts(categoryProducts, filters, 'subcategory');
    const bySize = filterProducts(categoryProducts, filters, 'sizes');
    const byPrice = filterProducts(categoryProducts, filters, 'price');
    return {
      subcategories: [
        { value: 'all', label: 'Todos', count: bySub.length },
        ...subcategoryNames.map((value) => ({
          value,
          label: capitalize(value),
          count: bySub.filter((p) => p.subcategory === value).length,
        })),
      ],
      sizes: sizeNames.map((value) => ({
        value,
        label: value,
        count: bySize.filter((p) => (p.sizes || []).includes(value)).length,
      })),
      prices: Object.entries(PRICE_RANGES).map(([value, { label, test }]) => ({
        value,
        label,
        count: byPrice.filter(test).length,
      })),
    };
  }, [categoryProducts, filters, subcategoryNames, sizeNames]);

  // --- URL updates. Any change to a filter resets the page to 1. ---
  const updateParams = useCallback(
    (changes) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(changes).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') next.delete(key);
            else next.set(key, String(value));
          });
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  const setSubcategory = useCallback(
    (value) => updateParams({ subcategory: value === 'all' ? null : value, page: null }),
    [updateParams]
  );

  const toggleSize = useCallback(
    (size) => {
      const next = filters.sizes.includes(size)
        ? filters.sizes.filter((s) => s !== size)
        : [...filters.sizes, size];
      updateParams({ sizes: next.join(','), page: null });
    },
    [filters.sizes, updateParams]
  );

  const setPrice = useCallback(
    (value) => updateParams({ price: value === 'all' ? null : value, page: null }),
    [updateParams]
  );

  const setSort = useCallback(
    (value) => updateParams({ sort: value === DEFAULT_SORT ? null : value, page: null }),
    [updateParams]
  );

  const setPage = useCallback(
    (value) => {
      updateParams({ page: value <= 1 ? null : value });
    },
    [updateParams]
  );

  // Clears the filters but keeps the chosen sort order.
  const clearFilters = useCallback(
    () => updateParams({ subcategory: null, sizes: null, price: null, page: null }),
    [updateParams]
  );

  // --- Removable chips for the active filters ---
  const activeFilters = useMemo(
    () => [
      ...(filters.subcategory !== 'all'
        ? [{ key: 'subcategory', label: capitalize(filters.subcategory), remove: () => setSubcategory('all') }]
        : []),
      ...filters.sizes.map((size) => ({
        key: `size-${size}`,
        label: `Talla ${size}`,
        remove: () => toggleSize(size),
      })),
      ...(filters.price !== 'all'
        ? [{ key: 'price', label: PRICE_RANGES[filters.price].label, remove: () => setPrice('all') }]
        : []),
    ],
    [filters, setSubcategory, toggleSize, setPrice]
  );

  return {
    filters,
    facets,
    results,
    pageItems,
    page,
    totalPages,
    perPage,
    isUnknownCategory: categoryProducts.length === 0,
    activeFilters,
    setSubcategory,
    toggleSize,
    setPrice,
    setSort,
    setPage,
    clearFilters,
  };
}
