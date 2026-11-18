import React from 'react';
import Seo from '../components/Seo';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-5 md:px-10 lg:px-20 py-16 min-h-[calc(100vh-12rem)]">
      <Seo title="Políticas de privacidad" description="Conoce cómo Meraqui Fashion trata y protege tus datos personales." />
      <h1 className="text-4xl md:text-5xl font-bold text-blue-serene mb-8 text-center">Políticas de Privacidad</h1>

      <div className="bg-white-custom p-8 rounded-lg shadow-lg max-w-3xl mx-auto leading-relaxed">
        <p className="mb-4 text-gray-700">
          En <strong>Meraqui Fashion</strong> nos comprometemos a proteger tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos la información personal que nos compartes al usar este sitio y al hacer tus pedidos por WhatsApp.
        </p>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">1. Información que Recopilamos</h2>
        <p className="mb-4 text-gray-700">
          Este sitio no tiene registro de usuarios ni procesa pagos en línea. Los pedidos y consultas se gestionan por WhatsApp, y solo recibimos la información que tú nos envías por ese medio o por correo electrónico. Esta información puede incluir:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Nombre completo.</li>
          <li>Número de teléfono.</li>
          <li>Dirección y ciudad de entrega.</li>
          <li>Imágenes o diseños que nos envíes para personalizar tus prendas.</li>
        </ul>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">2. Uso de la Información</h2>
        <p className="mb-4 text-gray-700">
          Utilizamos la información recopilada para:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Comunicarnos contigo sobre el estado de tu pedido.</li>
          <li>Confeccionar, estampar o bordar tus prendas según tu diseño.</li>
          <li>Coordinar el envío de tu pedido.</li>
          <li>Responder tus preguntas y brindarte soporte.</li>
        </ul>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">3. Protección de la Información</h2>
        <p className="mb-4 text-gray-700">
          Tratamos tu información con cuidado y solo la usamos para atender tu pedido o consulta. Ten en cuenta que las conversaciones por WhatsApp se rigen también por las políticas de privacidad de esa plataforma.
        </p>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">4. Compartir Información con Terceros</h2>
        <p className="mb-4 text-gray-700">
          No vendemos ni cedemos tu información personal a terceros. Solo la compartimos con las empresas de mensajería que realizan la entrega de tu pedido, y únicamente en la medida necesaria para ello. Podemos divulgar tu información cuando la ley lo exija o para proteger nuestros derechos, propiedad o seguridad, o los de otros.
        </p>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">5. Tus Derechos</h2>
        <p className="mb-4 text-gray-700">
          Tienes derecho a acceder, corregir, actualizar o solicitar la eliminación de tu información personal. Para ejercer estos derechos, escríbenos a <a href="mailto:info@meraquifashion.com" className="underline underline-offset-4 hover:text-blue-serene">info@meraquifashion.com</a> o por WhatsApp.
        </p>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">6. Cambios en la Política de Privacidad</h2>
        <p className="mb-4 text-gray-700">
          Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio será publicado en esta página.
        </p>

        <p className="text-sm text-gray-500 mt-8 text-center">
          Última actualización: 18 de noviembre de 2026
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
