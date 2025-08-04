import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-5 md:px-10 lg:px-20 py-16 font-montserrat min-h-[calc(100vh-12rem)]">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-serene mb-8 text-center">Políticas de Privacidad</h1>
      
      <div className="bg-white-custom p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
        <p className="mb-4 text-gray-700">
          En **Meraqui Fashion**, nos comprometemos a proteger su privacidad. Esta política describe cómo recopilamos, usamos y protegemos la información personal que nos proporciona al utilizar nuestra tienda virtual.
        </p>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">1. Información que Recopilamos</h2>
        <p className="mb-4 text-gray-700">
          Recopilamos información personal cuando usted realiza una compra, se registra en nuestro sitio, se suscribe a nuestro boletín o se comunica con nosotros. Esta información puede incluir:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Nombre completo</li>
          <li>Número de teléfono</li>
          
        </ul>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">2. Uso de la Información</h2>
        <p className="mb-4 text-gray-700">
          Utilizamos la información recopilada para:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Comunicarnos con usted sobre el estado de su pedido.</li>
          <li>Mejorar nuestros productos y servicios.</li>
          <li>Responder a sus preguntas y brindar soporte al cliente.</li>
        </ul>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">3. Protección de la Información</h2>
        <p className="mb-4 text-gray-700">
          Implementamos diversas medidas de seguridad para mantener la seguridad de su información personal. Utilizamos cifrado SSL para proteger los datos sensibles transmitidos en línea y mantenemos estrictos procedimientos de seguridad física y electrónica para proteger su información.
        </p>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">4. Compartir Información con Terceros</h2>
        <p className="mb-4 text-gray-700">
          No vendemos, comercializamos ni transferimos de ninguna otra forma a terceros su información de identificación personal, excepto a los socios de confianza que nos ayudan a operar nuestro sitio web, llevar a cabo nuestro negocio o brindarle servicios, siempre que dichas partes acuerden mantener esta información confidencial. Podemos divulgar su información cuando creamos que la divulgación es apropiada para cumplir con la ley, hacer cumplir las políticas de nuestro sitio o proteger nuestros derechos, propiedad o seguridad o los de otros.
        </p>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">5. Sus Derechos</h2>
        <p className="mb-4 text-gray-700">
          Usted tiene derecho a acceder, corregir, actualizar o solicitar la eliminación de su información personal. Para ejercer estos derechos, por favor contáctenos a través de info@meraquifashion.com.
        </p>

        <h2 className="text-2xl font-bold text-black-meraqui mt-8 mb-4">6. Cambios en la Política de Privacidad</h2>
        <p className="mb-4 text-gray-700">
          Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Cualquier cambio será publicado en esta página.
        </p>

        <p className="text-sm text-gray-500 mt-8 text-center">
          Última actualización: 04 de agosto de 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;