import React from 'react';
import Seo from '../components/Seo';
import LegalLayout from '../components/LegalLayout';

const TermsAndConditions = () => {
  return (
    <LegalLayout title="Términos y Condiciones" updated="18 de noviembre de 2026">
      <Seo title="Términos y condiciones" description="Condiciones de uso del sitio y de compra de Meraqui Fashion." />
      <p>
        Bienvenido a <strong>Meraqui Fashion</strong>. Al acceder y utilizar nuestra tienda virtual, usted acepta cumplir con los siguientes términos y condiciones. Por favor, léalos detenidamente.
      </p>

      <h2>1. Uso del Sitio Web</h2>
      <p>
        Este sitio web está destinado para su uso personal y no comercial. Cualquier uso indebido del sitio, incluyendo pero no limitado a la reproducción, distribución, transmisión o exhibición del contenido con fines comerciales, está estrictamente prohibido. Usted se compromete a no utilizar este sitio para fines ilegales o no autorizados.
      </p>

      <h2>2. Productos y Precios</h2>
      <p>
        Nos esforzamos por garantizar que toda la información, descripciones y precios de los productos mostrados en el sitio sean precisos. Sin embargo, no podemos garantizar que los colores y detalles de los productos sean exactamente como se muestran en su dispositivo, ya que esto puede variar según la configuración de su pantalla. Nos reservamos el derecho de modificar los precios y la disponibilidad de los productos en cualquier momento sin previo aviso.
      </p>

      <h2>3. Pedidos y Pagos</h2>
      <p>
        Este sitio funciona como catálogo: los pedidos se realizan y confirman por WhatsApp, donde te indicaremos las formas de pago disponibles, los tiempos y los costos de tu pedido. Todos los pedidos están sujetos a disponibilidad y a nuestra confirmación. Nos reservamos el derecho de rechazar o cancelar cualquier pedido por razones como problemas de stock o errores en la descripción o el precio del producto.
      </p>

      <h2>4. Propiedad Intelectual</h2>
      <p>
        Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, imágenes, videos y software, es propiedad de Meraqui Fashion o de sus proveedores de contenido y está protegido por las leyes de derechos de autor y propiedad intelectual.
      </p>

      <h2>5. Enlaces a Terceros</h2>
      <p>
        Nuestro sitio web puede contener enlaces a sitios web de terceros que no son operados por nosotros. No tenemos control sobre el contenido, las políticas de privacidad o las prácticas de estos sitios de terceros y no asumimos ninguna responsabilidad por ellos.
      </p>

      <h2>6. Limitación de Responsabilidad</h2>
      <p>
        Meraqui Fashion no será responsable por ningún daño directo, indirecto, incidental, consecuente o punitivo que resulte del uso o la imposibilidad de usar este sitio web o de los productos adquiridos a través de él.
      </p>

      <h2>7. Modificaciones de los Términos</h2>
      <p>
        Nos reservamos el derecho de actualizar o modificar estos términos y condiciones en cualquier momento sin previo aviso. Es su responsabilidad revisar periódicamente esta página para estar al tanto de cualquier cambio.
      </p>

      <h2>8. Ley Aplicable</h2>
      <p>
        Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de Colombia.
      </p>
    </LegalLayout>
  );
};

export default TermsAndConditions;
