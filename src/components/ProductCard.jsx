import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/producto/${product.id}`} className="product-card-link">
      <article className="product-card">
        <div className="product-image-container">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="image-placeholder">No Image Available</div>
          )}
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          {product.retailPrice && (
            <span className="product-price">{formatPrice(product.retailPrice)}</span>
          )}
          <button className="view-product-button">Ver Producto</button>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;