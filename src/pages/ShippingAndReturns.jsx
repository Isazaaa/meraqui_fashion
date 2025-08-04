import React from 'react';

const ShippingAndReturns = () => {
  return (
    <div className="container mx-auto px-5 md:px-10 lg:px-20 py-16 font-montserrat min-h-[calc(100vh-12rem)]">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-serene mb-8 text-center">Envíos y Devoluciones</h1>
      
      <div className="bg-white-custom p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-black-meraqui mb-4">1. Envíos</h2>
        <p className="mb-4 text-gray-700">
          En **Meraqui Fashion**, realizamos envíos a **todo el territorio colombiano**. Nos asociamos con empresas de mensajería confiables para asegurar que su pedido llegue de manera segura y eficiente a su destino.
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li><strong>Tiempo de procesamiento:</strong> Los pedidos se procesan y despachan en un plazo de [X] a [Y] días hábiles después de la confirmación del pago. (Por favor, reemplaza X e Y con tus tiempos reales).</li>
          <li><strong>Tiempo de entrega:</strong> Una vez despachado, el tiempo de entrega puede variar según la ciudad o región de destino. Generalmente, las entregas se realizan en un plazo de [A] a [B] días hábiles para ciudades principales y [C] a [D] días hábiles para otras zonas. (Por favor, reemplaza A, B, C, D con tus tiempos reales).</li>
          <li><strong>Costos de envío:</strong> El costo del envío se calculará durante el proceso de compra, antes de finalizar su pedido, y dependerá de la dirección de destino y el peso/volumen del paquete.</li>
          <li><strong>Seguimiento de pedidos:</strong> Una vez que su pedido sea despachado, recibirá un correo electrónico con el número de guía para que pueda rastrear su envío directamente en la página web de la transportadora.</li>
        </ul>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">2. Devoluciones y Garantías</h2>
        <p className="mb-4 text-gray-700">
          Nos esforzamos por ofrecer productos de la más alta calidad y personalizados a su gusto. Sin embargo, entendemos que pueden surgir situaciones que requieran una corrección.
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li><strong>Condiciones para devolución/corrección:</strong> Aceptamos devoluciones únicamente para realizar correcciones en la prenda cuando haya un error de confección, estampado o bordado atribuible a **Meraqui Fashion**.</li>
          <li><strong>Proceso de corrección:</strong> Si su prenda necesita una corrección, por favor contáctenos a través de info@meraquifashion.com o al WhatsApp +57 320 564 6710 en un plazo máximo de [Número] días calendario después de recibir su pedido, adjuntando fotografías claras del defecto. Evaluaremos su caso y, si aplica, coordinaremos la recogida de la prenda defectuosa y el envío de la prenda corregida.</li>
          <li><strong>Política de no devolución de dinero:</strong> En **Meraqui Fashion**, no realizamos devoluciones de dinero. Nuestro compromiso es garantizar su satisfacción mediante la corrección de cualquier defecto de fabricación o personalización que sea responsabilidad nuestra.</li>
          <li><strong>Prendas personalizadas:</strong> Debido a la naturaleza personalizada de nuestros productos, no se aceptan devoluciones o cambios por razones ajenas a defectos de confección o personalización (por ejemplo, cambios de opinión o errores en la talla seleccionada por el cliente). Por favor, revise cuidadosamente las tablas de tallas y los detalles de su diseño antes de confirmar su pedido.</li>
        </ul>

        <p className="text-sm text-gray-500 mt-8 text-center">
          Última actualización: 04 de agosto de 2025
        </p>
      </div>
    </div>
  );
};

export default ShippingAndReturns;