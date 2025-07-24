import React from 'react';
import { Typography, Card, Divider } from 'antd';

const { Title, Paragraph, Text } = Typography;

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Términos de Servicio
        </Title>
        <Text className="text-gray-600">Última actualización: 1 de enero de 2025</Text>
      </div>

      <Card>
        <div className="space-y-6">
          <section>
            <Title level={3}>1. Aceptación de Términos</Title>
            <Paragraph>
              Al acceder y usar TicketHub, aceptas y acuerdas estar sujeto a los términos 
              y disposiciones de este acuerdo. Si no aceptas cumplir con lo anterior, 
              por favor no uses este servicio.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>2. Licencia de Uso</Title>
            <Paragraph>
              Se otorga permiso para descargar temporalmente una copia de los materiales de TicketHub 
              para visualización personal, no comercial y transitoria únicamente. Esta es la concesión de una 
              licencia, no una transferencia de título, y bajo esta licencia no puedes:
            </Paragraph>
            <ul className="ml-6 space-y-2">
              <li>modificar o copiar los materiales</li>
              <li>usar los materiales para cualquier propósito comercial o para cualquier exhibición pública</li>
              <li>intentar hacer ingeniería inversa de cualquier software contenido en el sitio web</li>
              <li>remover cualquier derecho de autor u otras notaciones propietarias de los materiales</li>
            </ul>
          </section>

          <Divider />

          <section>
            <Title level={3}>3. Compra de Boletos</Title>
            <Paragraph>
              Todas las ventas de boletos son finales a menos que se especifique lo contrario por el organizador del evento. 
              Los precios están sujetos a cambios sin previo aviso. Nos reservamos el derecho de rechazar 
              el servicio a cualquier persona por cualquier razón en cualquier momento.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>4. Cuentas de Usuario</Title>
            <Paragraph>
              Eres responsable de proteger la contraseña y de mantener la 
              confidencialidad de tu cuenta. Aceptas no divulgar tu contraseña 
              a terceros y asumir la responsabilidad exclusiva de las actividades que 
              ocurran bajo tu cuenta.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>5. Política de Privacidad</Title>
            <Paragraph>
              Tu privacidad es importante para nosotros. Por favor revisa nuestra Política de Privacidad, que 
              también rige tu uso del servicio, para entender nuestras prácticas.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>6. Descargo de Responsabilidad</Title>
            <Paragraph>
              Los materiales en TicketHub se proporcionan "tal como están". TicketHub 
              no ofrece garantías, expresas o implícitas, y por la presente rechaza y anula 
              todas las demás garantías incluyendo sin limitación, garantías implícitas o 
              condiciones de comerciabilidad, idoneidad para un propósito particular, o 
              no infracción de propiedad intelectual u otra violación de derechos.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>7. Limitaciones</Title>
            <Paragraph>
              En ningún caso TicketHub o sus proveedores serán responsables por cualquier daño 
              (incluyendo, sin limitación, daños por pérdida de datos o ganancias, o 
              debido a interrupción del negocio) que surja del uso o la incapacidad de usar 
              los materiales de TicketHub, incluso si TicketHub o un representante autorizado 
              ha sido notificado oralmente o por escrito de la posibilidad de tal daño.
            </Paragraph>
          </section>

          <Divider />

          <section>
            <Title level={3}>8. Información de Contacto</Title>
            <Paragraph>
              Si tienes alguna pregunta sobre estos Términos de Servicio, por favor contáctanos a:
              <br />
              Email: legal@tickethub.com
              <br />
              Teléfono: +1 (555) 123-4567
            </Paragraph>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default Terms;