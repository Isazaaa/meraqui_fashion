import React from 'react';
import Seo from '../components/Seo';
import LegalLayout from '../components/LegalLayout';

const PrivacyPolicy = () => {
  return (
    <LegalLayout title="Políticas de Privacidad" updated="18 de noviembre de 2026">
      <Seo title="Políticas de privacidad" description="Conoce cómo Meraqui Fashion trata y protege tus datos personales." />
      <p>
        En <strong>Meraqui Fashion</strong> nos comprometemos a proteger tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos la información personal que nos compartes al usar este sitio y al hacer tus pedidos por WhatsApp.
      </p>

      <h2>1. Información que Recopilamos</h2>
      <p>
        Este sitio no tiene registro de usuarios ni procesa pagos en línea. Los pedidos y consultas se gestionan por WhatsApp, y solo recibimos la información que tú nos envías por ese medio o por correo electrónico. Esta información puede incluir:
      </p>
      <ul>
        <li>Nombre completo.</li>
        <li>Número de teléfono.</li>
        <li>Dirección y ciudad de entrega.</li>
        <li>Imágenes o diseños que nos envíes para personalizar tus prendas.</li>
      </ul>

      <h2>2. Uso de la Información</h2>
      <p>
        Utilizamos la información recopilada para:
      </p>
      <ul>
        <li>Comunicarnos contigo sobre el estado de tu pedido.</li>
        <li>Confeccionar, estampar o bordar tus prendas según tu diseño.</li>
        <li>Coordinar el envío de tu pedido.</li>
        <li>Responder tus preguntas y brindarte soporte.</li>
      </ul>

      <h2>3. Protección de la Información</h2>
      <p>
        Tratamos tu información con cuidado y solo la usamos para atender tu pedido o consulta. Ten en cuenta que las conversaciones por WhatsApp se rigen también por las políticas de privacidad de esa plataforma.
      </p>

      <h2>4. Compartir Información con Terceros</h2>
      <p>
        No vendemos ni cedemos tu información personal a terceros. Solo la compartimos con las empresas de mensajería que realizan la entrega de tu pedido, y únicamente en la medida necesaria para ello. Podemos divulgar tu información cuando la ley lo exija o para proteger nuestros derechos, propiedad o seguridad, o los de otros.
      </p>

      <h2>5. Tus Derechos</h2>
      <p>
        Tienes derecho a acceder, corregir, actualizar o solicitar la eliminación de tu información personal. Para ejercer estos derechos, escríbenos a <a href="mailto:info@meraquifashion.com">info@meraquifashion.com</a> o por WhatsApp.
      </p>

      <h2>6. Cambios en la Política de Privacidad</h2>
      <p>
        Nos reservamos el derecho de modificar esta política en cualquier momento. Cualquier cambio será publicado en esta página.
      </p>
    </LegalLayout>
  );
};

export default PrivacyPolicy;
