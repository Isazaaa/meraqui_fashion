import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const product = products.find(p => p.id == productId);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem' }}>
        <h2>Producto no encontrado</h2>
      </div>
    );
  }

  const [selectedSize, setSelectedSize] = useState(null);

  const formatPrice = (price) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);
  
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const productNameForWhatsApp = encodeURIComponent(product.name);
  const sizeForWhatsApp = selectedSize ? encodeURIComponent(` en talla: ${selectedSize}`) : '';
  const whatsappLink = `https://wa.me/573205646710?text=¡Hola!%20Estoy%20interesado%20en%20el%20${productNameForWhatsApp}${sizeForWhatsApp}.`;

  return (
    <div className="product-detail-container">
      <div className="product-gallery">
        <div className="main-image-wrapper">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>
      </div>

      <div className="product-info-column">
        <h1 className="product-title">{product.name}</h1>
        {/* Usamos una comprobación para no romper la app si falta el precio */}
        {product.retailPrice && <p className="product-retail-price">{formatPrice(product.retailPrice)}</p>}

        <div className="info-section">
          <h2 className="section-subtitle">Selecciona tu Talla</h2>
          <div className="size-selector">
            {/* AQUÍ ESTÁ LA MEJORA: `product.sizes && ...` 
              Esto solo intentará hacer el .map si `product.sizes` existe.
            */}
            {product.sizes && product.sizes.map(size => (
              <button
                key={size}
                className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="cta-whatsapp-button">
          Pedir por WhatsApp
        </a>

        <div className="info-section">
          <h2 className="section-subtitle">Precios Especiales y Materiales</h2>
          <div className="details-content">
            {product.materials && <p><strong>Materiales:</strong> {product.materials}</p>}
            <ul className="special-prices">
              {product.wholesalePrice && <li><strong>Al por Mayor (desde 6 unidades):</strong> {formatPrice(product.wholesalePrice)}</li>}
              {product.specialFabricPrice && <li><strong>Opción Tela Fría:</strong> {formatPrice(product.specialFabricPrice)}</li>}
            </ul>
            <p className="contact-note">Contáctanos por WhatsApp para realizar tus compras.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;