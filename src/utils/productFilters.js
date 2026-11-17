// Filter / sort configuration and pure helpers for the category page.

// Display order for sizes; anything unknown is appended at the end.
export const SIZE_ORDER = ['S', 'S-M', 'M', 'L', 'L-XL', 'XL', '2-4', '6-8', '10-12', '14-16'];

export const PRICE_RANGES = {
  all: { label: 'Todos los precios', test: () => true },
  lt50: { label: 'Hasta $50.000', test: (p) => p.retailPrice < 50000 },
  mid: { label: '$50.000 – $80.000', test: (p) => p.retailPrice >= 50000 && p.retailPrice <= 80000 },
  gt80: { label: 'Más de $80.000', test: (p) => p.retailPrice > 80000 },
};

export const SORT_OPTIONS = {
  featured: { label: 'Destacados', compare: (a, b) => a.id - b.id },
  'price-asc': { label: 'Precio: menor a mayor', compare: (a, b) => a.retailPrice - b.retailPrice },
  'price-desc': { label: 'Precio: mayor a menor', compare: (a, b) => b.retailPrice - a.retailPrice },
  'name-asc': { label: 'Nombre: A-Z', compare: (a, b) => a.name.localeCompare(b.name) },
};

export const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

export const hasKey = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export const compareSizes = (a, b) => {
  const ia = SIZE_ORDER.indexOf(a);
  const ib = SIZE_ORDER.indexOf(b);
  return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
};

const TESTS = {
  subcategory: (p, f) => f.subcategory === 'all' || p.subcategory === f.subcategory,
  sizes: (p, f) => f.sizes.length === 0 || (p.sizes || []).some((s) => f.sizes.includes(s)),
  price: (p, f) => PRICE_RANGES[f.price].test(p),
};

/**
 * Applies every filter except the (optional) `ignore` one. Ignoring a facet is
 * what makes per-option counts reflect the OTHER active filters.
 */
export function filterProducts(products, filters, ignore) {
  return products.filter((p) =>
    Object.keys(TESTS).every((key) => key === ignore || TESTS[key](p, filters))
  );
}
