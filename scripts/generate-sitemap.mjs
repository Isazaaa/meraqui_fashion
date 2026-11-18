/**
 * Generates public/sitemap.xml from the product data, categories and static pages.
 * Runs automatically before `npm run build` (see "prebuild" in package.json).
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { products } from '../src/data/products.js';
import { CATEGORIES, STATIC_PAGES, SITE_URL } from '../src/config/site.js';

const paths = [
  '/',
  ...Object.keys(CATEGORIES).map((slug) => `/categoria/${slug}`),
  ...STATIC_PAGES,
  ...products.map((p) => `/producto/${p.id}`),
];

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const lastmod = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((p) => `  <url><loc>${escapeXml(SITE_URL + p)}</loc><lastmod>${lastmod}</lastmod></url>`)
  .join('\n')}
</urlset>
`;

const out = fileURLToPath(new URL('../public/sitemap.xml', import.meta.url));
writeFileSync(out, xml);
console.log(`sitemap.xml: ${paths.length} URLs -> ${out}`);
