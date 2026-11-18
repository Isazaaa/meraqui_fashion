import React from 'react';
import Seo from '../components/Seo';

const ShippingAndReturns = () => {
  return (
    <div className="container mx-auto px-5 md:px-10 lg:px-20 py-16 min-h-[calc(100vh-12rem)]">
      <Seo title="Envíos y devoluciones" description="Información sobre envíos a todo el país, correcciones y política de devoluciones de Meraqui Fashion." />
      <h1 className="text-4xl md:text-5xl font-bold text-blue-serene mb-8 text-center">Envíos y Devoluciones</h1>
      
      <div className="bg-white-custom p-8 rounded-lg shadow-lg max-w-3xl mx-auto leading-relaxed">
        <h2 className="text-2xl font-bold text-black-meraqui mb-4">1. Envíos</h2>
        <p className="mb-4 text-gray-700">
          En <strong>Meraqui Fashion</strong> realizamos envíos a <strong>todo el territorio colombiano</strong>. Nos asociamos con empresas de mensajería confiables para asegurar que su pedido llegue de manera segura y eficiente a su destino.
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li><strong>Tiempo de procesamiento:</strong> El tiempo de elaboración depende de la prenda y de la personalización que elijas; te lo confirmamos por WhatsApp al acordar tu pedido.</li>
          <li><strong>Tiempo de entrega:</strong> Una vez despachado, el tiempo de entrega varía según la ciudad o región de destino. Te confirmamos el tiempo estimado por WhatsApp antes de despachar tu pedido.</li>
          <li><strong>Costos de envío:</strong> Los costos de envío dependen de la ciudad de destino y del tamaño del paquete; te los confirmamos por WhatsApp antes de despachar tu pedido.</li>
          <li><strong>Seguimiento de pedidos:</strong> Si la transportadora asigna un número de guía, te lo compartiremos por WhatsApp para que puedas rastrear tu envío en la página de la transportadora.</li>
        </ul>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">2. Devoluciones y Garantías</h2>
        <p className="mb-4 text-gray-700">
          Nos esforzamos por ofrecer productos de la más alta calidad y personalizados a su gusto. Sin embargo, entendemos que pueden surgir situaciones que requieran una corrección.
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li><strong>Condiciones para devolución/corrección:</strong> Aceptamos devoluciones únicamente para realizar correcciones en la prenda cuando haya un error de confección, estampado o bordado atribuible a <strong>Meraqui Fashion</strong>.</li>
          <li><strong>Proceso de corrección:</strong> Si su prenda necesita una corrección, por favor contáctenos lo antes posible después de recibir su pedido, a través de info@meraquifashion.com o al WhatsApp +57 320 564 6710, adjuntando fotografías claras del defecto. Evaluaremos su caso y, si aplica, coordinaremos con usted la corrección de la prenda.</li>
          <li><strong>Política de no devolución de dinero:</strong> En <strong>Meraqui Fashion</strong> no realizamos devoluciones de dinero. Nuestro compromiso es garantizar su satisfacción mediante la corrección de cualquier defecto de fabricación o personalización que sea responsabilidad nuestra.</li>
          <li><strong>Prendas personalizadas:</strong> Debido a la naturaleza personalizada de nuestros productos, no se aceptan devoluciones o cambios por razones ajenas a defectos de confección o personalización (por ejemplo, cambios de opinión o errores en la talla seleccionada por el cliente). Por favor, revise cuidadosamente las tablas de tallas y los detalles de su diseño antes de confirmar su pedido.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-8 text-center">
          Última actualización: 18 de noviembre de 2026
        </p>
      </div>
    </div>
  );
};

export default ShippingAndReturns;