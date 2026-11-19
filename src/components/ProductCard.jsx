import React from "react";
import { Link } from "react-router-dom";

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

const ProductCard = ({ product }) => {
  const priceLabel = product.retailPrice ? priceFormatter.format(product.retailPrice) : null;

  return (
    <Link
      to={`/producto/${product.id}`}
      aria-label={priceLabel ? `${product.name}, ${priceLabel}` : product.name}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-serene focus-visible:ring-offset-2"
    >
      <article className="flex h-full flex-col">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
          {product.image ? (
            <img
              src={product.image}
              alt=""
              width="600"
              height="800"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center motion-safe:transition-[transform,opacity] motion-safe:duration-500 motion-safe:ease-out group-hover:opacity-90 motion-safe:group-hover:scale-[1.02]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.14em] text-neutral-500">
              Sin imagen
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col pt-3">
          {product.subcategory && (
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-500">
              {product.subcategory}
            </p>
          )}
          <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-black-meraqui">
            {product.name}
          </h3>
          {priceLabel && <p className="mt-1 text-sm text-neutral-600">{priceLabel}</p>}
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
