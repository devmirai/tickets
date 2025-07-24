import React from 'react';
import { Typography, Card, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Política de Privacidad
        </Title>
        <Text className="text-gray-600">Última actualización: 1 de enero de 2025</Text>
      </div>

      <Card>
        <div className="space-y-6">
          <section>
            <Title level={3}>1. Información que Recopilamos</Title>
            <Paragraph>
              Recopilamos información que nos proporcionas directamente, como cuando creas 
              una cuenta, realizas una compra o nos contactas para obtener soporte. Esto puede incluir:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>Nombre e información de contacto</li>
              <li>Información de pago</li>
              <li>Credenciales de cuenta</li>
              <li>Preferencias de comunicación</li>
              <li>Historial de compras y preferencias</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>2. Cómo Usamos Tu Información</Title>
            <Paragraph>
              Usamos la información que recopilamos para:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>Procesar transacciones y enviar información relacionada</li>
              <li>Proporcionar atención y soporte al cliente</li>
              <li>Enviarte avisos técnicos y alertas de seguridad</li>
              <li>Comunicarnos sobre productos, servicios y eventos</li>
              <li>Mejorar nuestros servicios y desarrollar nuevas funciones</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>3. Compartir Información</Title>
            <Paragraph>
              No vendemos, intercambiamos o transferimos tu información personal a 
              terceros sin tu consentimiento, excepto como se describe en esta política. 
              Podemos compartir tu información con:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>Proveedores de servicios que asisten en nuestras operaciones</li>
              <li>Organizadores de eventos para el cumplimiento de boletos</li>
              <li>Autoridades legales cuando lo requiera la ley</li>
              <li>Socios comerciales con tu consentimiento explícito</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>4. Seguridad de Datos</Title>
            <Paragraph>
              Implementamos medidas de seguridad apropiadas para proteger tu información personal 
              contra acceso no autorizado, alteración, divulgación o destrucción. Esto incluye:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>Encriptación SSL para transmisión de datos</li>
              <li>Servidores y bases de datos seguros</li>
              <li>Auditorías de seguridad y actualizaciones regulares</li>
              <li>Acceso limitado a información personal</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>5. Cookies y Seguimiento</Title>
            <Paragraph>
              Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar 
              patrones de uso y proporcionar contenido personalizado. Puedes controlar la 
              configuración de cookies a través de las preferencias de tu navegador.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>6. Tus Derechos</Title>
            <Paragraph>
              Tienes el derecho a:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>Acceder y actualizar tu información personal</li>
              <li>Eliminar tu cuenta y datos asociados</li>
              <li>Optar por no recibir comunicaciones de marketing</li>
              <li>Solicitar una copia de tus datos</li>
              <li>Presentar una queja ante las autoridades regulatorias</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>7. Privacidad de Menores</Title>
            <Paragraph>
              Nuestro servicio no está destinado a menores de 13 años. No recopilamos 
              intencionalmente información personal de menores de 13 años. Si nos enteramos 
              de que hemos recopilado dicha información, tomaremos medidas para eliminarla.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>8. Cambios a Esta Política</Title>
            <Paragraph>
              Podemos actualizar esta política de privacidad de vez en cuando. Te notificaremos 
              sobre cualquier cambio publicando la nueva política en esta página y actualizando 
              la fecha de "Última actualización".
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>9. Contáctanos</Title>
            <Paragraph>
              Si tienes preguntas sobre esta política de privacidad, por favor contáctanos a:
              <br />
              Email: privacy@tickethub.com
              <br />
              Teléfono: +1 (555) 123-4567
              <br />
              Dirección: 123 Event Street, Downtown District, New York, NY 10001
            </Paragraph>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default Privacy;