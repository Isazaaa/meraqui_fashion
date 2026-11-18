// Central site metadata. Plain JS (no JSX/imports) so Node scripts can import it too.

// IMPORTANT: change this to 'https://www.meraquifashion.com' once the domain is live.
export const SITE_URL = 'https://meraqui-fashion.vercel.app';

export const SITE_NAME = 'Meraqui Fashion';

export const DEFAULT_TITLE = 'Meraqui Fashion | Ropa casual y prendas personalizadas';

export const DEFAULT_DESCRIPTION =
  'Tienda virtual de ropa casual con confección, estampado y bordado personalizado. Ideal para empresas, fechas especiales o emprendedoras. Calidad, buen precio y envíos a todo el país.';

// 1200x630 brand image served from /public (also referenced in index.html).
export const DEFAULT_IMAGE = '/og-default.jpg';

// Category slugs must match `category` in src/data/products.js.
export const CATEGORIES = {
  mujer: {
    label: 'Mujer',
    description: 'Conjuntos y prendas casuales para mujer, con opción de estampado y bordado personalizado.',
  },
  hombre: {
    label: 'Hombre',
    description: 'Ropa casual para hombre, con opción de estampado y bordado personalizado.',
  },
  infantil: {
    label: 'Infantil',
    description: 'Ropa casual para niños y niñas, con opción de estampado y bordado personalizado.',
  },
  duo: {
    label: 'Duo',
    description: 'Conjuntos en pareja y a juego, con opción de estampado y bordado personalizado.',
  },
};

// Public, indexable pages other than home, categories and products.
export const STATIC_PAGES = [
  '/customizePage',
  '/politicas-privacidad',
  '/terminos-condiciones',
  '/envios-devoluciones',
];

export const absoluteUrl = (pathOrUrl = '/') =>
  /^https?:\/\//i.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
