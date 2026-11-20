import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Seo from '../components/Seo';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { CATEGORIES, SITE_NAME } from '../config/site';

const priceFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
});
const formatPrice = (price) => priceFormatter.format(price);

const WHATSAPP_NUMBER = '573205646710';
const SINGLE_KEY = 'single';

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2';

const ChevronIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
    <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Closest ids first, so the selection is stable between visits and renders.
const getRecommended = (product) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .sort((a, b) => Math.abs(a.id - product.id) - Math.abs(b.id - product.id) || a.id - b.id)
    .slice(0, 4);

const SizeGroup = ({ legend, name, sizes, value, onChange, invalid, describedBy }) => (
  <fieldset className="min-w-0" aria-describedby={invalid ? describedBy : undefined}>
    <legend className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
      {legend}
      {value && <span className="ml-2 normal-case tracking-normal text-black-meraqui">{value}</span>}
    </legend>
    <div className="mt-3 flex flex-wrap gap-2">
      {sizes.map((size) => (
        <div key={size} className="relative">
          <input
            type="radio"
            id={`${name}-${size}`}
            name={name}
            value={size}
            checked={value === size}
            onChange={() => onChange(size)}
            className="peer sr-only"
          />
          <label
            htmlFor={`${name}-${size}`}
            className={`flex h-11 min-w-11 cursor-pointer items-center justify-center border px-3 text-sm text-black-meraqui transition-colors hover:border-black-meraqui peer-checked:border-black-meraqui peer-checked:bg-black-meraqui peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-blue-serene peer-focus-visible:ring-offset-2 ${
              invalid && !value ? 'border-red-700' : 'border-neutral-300'
            }`}
          >
            {size}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

const AccordionItem = ({ title, children }) => (
  <details className="group border-b border-neutral-200">
    <summary
      className={`flex min-h-12 cursor-pointer list-none items-center justify-between py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-black-meraqui [&::-webkit-details-marker]:hidden ${focusRing}`}
    >
      {title}
      <ChevronIcon className="h-4 w-4 text-neutral-500 motion-safe:transition-transform group-open:rotate-180" />
    </summary>
    <div className="pb-5 text-sm leading-6 text-neutral-600">{children}</div>
  </details>
);

const ProductDetail = ({ product }) => {
  const isDuo = Array.isArray(product.duoOptions) && product.duoOptions.length > 0;
  const groups = isDuo
    ? product.duoOptions.map((o) => ({ key: o.name, label: o.name, sizes: o.sizes || [] }))
    : [{ key: SINGLE_KEY, label: 'Talla', sizes: product.sizes || [] }];

  const [selectedSizes, setSelectedSizes] = useState(() =>
    Object.fromEntries(groups.map((g) => [g.key, '']))
  );
  const [showError, setShowError] = useState(false);
  const sizesRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allSizesSelected = groups.every((g) => g.sizes.length === 0 || selectedSizes[g.key] !== '');
  const invalid = showError && !allSizesSelected;

  const sizesForWhatsApp = isDuo
    ? Object.entries(selectedSizes)
        .map(([optionName, size]) => `${optionName}: ${size}`)
        .join(', ')
    : selectedSizes[SINGLE_KEY];

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=¡Hola!%20Estoy%20interesado%20en%20el%20producto%20*${encodeURIComponent(product.name)}*.%0A%0ATallas:%20${encodeURIComponent(sizesForWhatsApp)}.%0A%0APor%20favor,%20dame%20más%20información.`;

  const handleSelect = (key) => (size) => setSelectedSizes((prev) => ({ ...prev, [key]: size }));

  const handleBlockedOrder = () => {
    setShowError(true);
    sizesRef.current?.scrollIntoView({ block: 'center' });
  };

  const category = CATEGORIES[product.category];
  const recommended = getRecommended(product);
  const errorText = isDuo ? 'Selecciona una talla para cada prenda.' : 'Selecciona una talla para continuar.';

  const metaDescription = [
    `${product.name}.`,
    product.retailPrice ? `Precio: ${formatPrice(product.retailPrice)}.` : null,
    product.materials ? `${product.materials.replace(/\.$/, '')}.` : null,
    'Pídelo por WhatsApp con envíos a todo el país.',
  ]
    .filter(Boolean)
    .join(' ');

  // Escape "<" so product text can never close the script tag.
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: metaDescription,
    brand: { '@type': 'Brand', name: SITE_NAME },
    ...(product.retailPrice && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'COP',
        price: product.retailPrice,
        availability: 'https://schema.org/InStock',
      },
    }),
  }).replace(/</g, '\\u003c');

  const ctaClass = `flex h-12 w-full items-center justify-center gap-2 bg-black-meraqui text-xs font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800 ${focusRing}`;

  const renderCta = (extraClass = '') =>
    allSizesSelected ? (
      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={`${ctaClass} ${extraClass}`}>
        <WhatsAppIcon className="h-5 w-5" />
        Pedir por WhatsApp
        <span className="sr-only"> (se abre en una pestaña nueva)</span>
      </a>
    ) : (
      <button type="button" onClick={handleBlockedOrder} className={`${ctaClass} ${extraClass}`}>
        <WhatsAppIcon className="h-5 w-5" />
        Pedir por WhatsApp
      </button>
    );

  const tiers = [
    product.retailPrice && { label: 'Detal', price: product.retailPrice },
    product.wholesalePrice && { label: 'Por mayor (desde 6 unidades)', price: product.wholesalePrice },
    product.specialFabricPrice && { label: 'Tela fría', price: product.specialFabricPrice },
  ].filter(Boolean);

  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-6 md:px-10 lg:px-16">
      <Seo
        title={product.name}
        description={metaDescription}
        image={product.image}
        path={`/producto/${product.id}`}
        type="product"
      >
        <script type="application/ld+json">{jsonLd}</script>
      </Seo>

      <nav aria-label="Ruta de navegación" className="text-xs text-neutral-500">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link to="/" className={`inline-flex min-h-11 items-center md:min-h-6 hover:text-black-meraqui ${focusRing}`}>
              Inicio
            </Link>
          </li>
          {category && (
            <>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  to={`/categoria/${product.category}`}
                  className={`inline-flex min-h-11 items-center md:min-h-6 hover:text-black-meraqui ${focusRing}`}
                >
                  {category.label}
                </Link>
              </li>
            </>
          )}
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="max-w-[60vw] truncate text-black-meraqui">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
        <div className="aspect-[3/4] w-full overflow-hidden bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            width="600"
            height="800"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          {product.subcategory && (
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
              {product.subcategory}
            </p>
          )}
          <h1 className="mt-2 text-2xl font-medium leading-tight tracking-tight text-black-meraqui md:text-3xl">
            {product.name.trim()}
          </h1>
          {product.retailPrice && <p className="mt-3 text-lg text-neutral-700">{formatPrice(product.retailPrice)}</p>}

          {tiers.length > 1 && (
            <dl className="mt-6 border-t border-neutral-200">
              {tiers.map((tier) => (
                <div key={tier.label} className="flex items-baseline justify-between border-b border-neutral-200 py-3 text-sm">
                  <dt className="text-neutral-500">{tier.label}</dt>
                  <dd className="text-black-meraqui">{formatPrice(tier.price)}</dd>
                </div>
              ))}
            </dl>
          )}

          <div ref={sizesRef} className="mt-8 scroll-mt-28 space-y-6">
            {groups.map((g) =>
              g.sizes.length > 0 ? (
                <SizeGroup
                  key={g.key}
                  legend={isDuo ? `Talla · ${g.label}` : 'Talla'}
                  name={`size-${g.key}`}
                  sizes={g.sizes}
                  value={selectedSizes[g.key]}
                  onChange={handleSelect(g.key)}
                  invalid={invalid}
                  describedBy="size-error"
                />
              ) : null
            )}
            <p id="size-error" role="status" aria-live="polite" className="min-h-5 text-sm text-red-700">
              {invalid ? errorText : ''}
            </p>
          </div>

          <div className="mt-2 hidden lg:block">{renderCta()}</div>

          <div className="mt-10 border-t border-neutral-200">
            {product.materials && <AccordionItem title="Materiales">{product.materials}</AccordionItem>}
            <AccordionItem title="Envíos y devoluciones">
              Enviamos a todo el país. Consulta tiempos, costos y condiciones en{' '}
              <Link
                to="/envios-devoluciones"
                className={`text-black-meraqui underline underline-offset-4 hover:text-blue-serene ${focusRing}`}
              >
                Envíos y devoluciones
              </Link>
              .
            </AccordionItem>
          </div>
        </div>
      </div>

      {recommended.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-16 border-t border-neutral-200 pb-16 pt-10 md:mt-24">
          <h2 id="related-heading" className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">
            También te puede gustar
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {recommended.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* In-flow sticky: pinned to the viewport bottom on mobile, but rests above the footer at the end of the page. */}
      <div className="sticky bottom-0 -mx-5 flex items-center gap-4 border-t border-neutral-200 bg-white px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 md:-mx-10 md:px-10 lg:hidden">
        {product.retailPrice && (
          <p className="shrink-0 text-base font-medium text-black-meraqui">{formatPrice(product.retailPrice)}</p>
        )}
        {renderCta('flex-1')}
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = products.find((p) => String(p.id) === productId);

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <Seo title="Producto no encontrado" description="El producto que buscas no existe o fue retirado." noindex />
        <h1 className="text-2xl font-medium text-black-meraqui">Producto no encontrado</h1>
        <p className="mt-4 text-sm text-neutral-600">Parece que el producto que buscas no existe o fue retirado.</p>
        <Link to="/" className="mt-8 inline-block text-sm underline underline-offset-4">
          Volver al inicio
        </Link>
      </div>
    );
  }

  // Keyed by id so selection state resets when navigating between products.
  return <ProductDetail key={product.id} product={product} />;
};

export default ProductDetailPage;
