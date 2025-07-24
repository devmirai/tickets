import React from 'react';
import { Typography, Card, Divider, Alert, Steps } from 'antd';
import { ClockCircleOutlined, DollarCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const Refunds = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Política de Reembolsos
        </Title>
        <Paragraph className="text-xl text-gray-600">
          Entendiendo nuestro proceso y políticas de reembolso
        </Paragraph>
      </div>

      <Alert
        message="Aviso Importante"
        description="Las políticas de reembolso pueden variar según el organizador del evento. Siempre revisa la política de reembolso específica del evento antes de comprar."
        type="info"
        showIcon
        className="mb-8"
      />

      <Card className="mb-8">
        <Title level={3} className="mb-6">Política General de Reembolsos</Title>
        
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <ClockCircleOutlined className="text-2xl text-blue-500 mt-1" />
            <div>
              <Title level={5}>Ventana Estándar de Reembolso</Title>
              <Paragraph>
                La mayoría de los boletos pueden ser reembolsados hasta 48 horas antes del inicio del evento. 
                Los reembolsos solicitados dentro de las 48 horas del evento pueden no ser procesados a menos 
                que el evento sea cancelado por el organizador.
              </Paragraph>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <DollarCircleOutlined className="text-2xl text-green-500 mt-1" />
            <div>
              <Title level={5}>Monto del Reembolso</Title>
              <Paragraph>
                Los reembolsos completos incluyen el precio del boleto menos las tarifas de procesamiento (típicamente S/2-5 por boleto). 
                Las tarifas de servicio no son reembolsables a menos que el evento sea cancelado por el organizador.
              </Paragraph>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <CheckCircleOutlined className="text-2xl text-purple-500 mt-1" />
            <div>
              <Title level={5}>Tiempo de Procesamiento</Title>
              <Paragraph>
                Los reembolsos aprobados se procesan dentro de 5-7 días hábiles. El reembolso aparecerá 
                en tu método de pago original. Los reembolsos con tarjeta de crédito pueden tomar 
                1-2 ciclos de facturación adicionales para aparecer en tu estado de cuenta.
              </Paragraph>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-8">
        <Title level={3} className="mb-6">Cómo Solicitar un Reembolso</Title>
        
        <Steps direction="vertical" current={-1}>
          <Step
            title="Verificar Elegibilidad para Reembolso"
            description="Verifica que tu evento sea elegible para reembolsos y esté dentro de la ventana de reembolso."
          />
          <Step
            title="Contactar Soporte"
            description="Envíanos un email a refunds@tickethub.com o llama al +1 (555) 123-4567 con tu número de orden."
          />
          <Step
            title="Proporcionar Información"
            description="Incluye tu número de orden, detalles del evento y la razón de la solicitud de reembolso."
          />
          <Step
            title="Esperar Confirmación"
            description="Revisaremos tu solicitud y enviaremos confirmación dentro de 24 horas."
          />
          <Step
            title="Recibir Reembolso"
            description="Los reembolsos aprobados se procesan dentro de 5-7 días hábiles."
          />
        </Steps>
      </Card>

      <Card className="mb-8">
        <Title level={3} className="mb-4">Circunstancias Especiales</Title>
        
        <div className="space-y-4">
          <div>
            <Title level={5}>Cancelación del Evento</Title>
            <Paragraph>
              Si un evento es cancelado por el organizador, todos los portadores de boletos reciben 
              reembolsos completos automáticos incluyendo todas las tarifas. No se requiere ninguna acción de tu parte.
            </Paragraph>
          </div>

          <div>
            <Title level={5}>Aplazamiento del Evento</Title>
            <Paragraph>
              Si un evento es aplazado, tus boletos siguen siendo válidos para la nueva fecha. Si no 
              puedes asistir en la nueva fecha, puedes solicitar un reembolso completo dentro de 30 días del 
              anuncio del aplazamiento.
            </Paragraph>
          </div>

          <div>
            <Title level={5}>Cambios de Lugar</Title>
            <Paragraph>
              Si el lugar de un evento es cambiado, puedes solicitar un reembolso si el nuevo lugar es 
              significativamente diferente o inconveniente. Las solicitudes de reembolso deben hacerse dentro de 
              14 días de la notificación del cambio de lugar.
            </Paragraph>
          </div>
        </div>
      </Card>

      <Card className="bg-red-50 border-red-200">
        <Title level={4} className="text-red-800 mb-3">Artículos No Reembolsables</Title>
        <ul className="space-y-2 text-red-700">
          <li>Boletos comprados dentro de las 48 horas del evento (a menos que el evento sea cancelado)</li>
          <li>Tarifas de servicio y procesamiento (a menos que el evento sea cancelado por el organizador)</li>
          <li>Boletos marcados como "Sin Reembolsos" al momento de la compra</li>
          <li>Boletos comprados a través de revendedores de terceros</li>
          <li>Descargas digitales o códigos de acceso de streaming</li>
        </ul>
      </Card>

      <Card className="mt-8 bg-blue-50 border-blue-200">
        <div className="text-center">
          <Title level={4} className="text-blue-800 mb-3">
            ¿Necesitas Ayuda con un Reembolso?
          </Title>
          <Paragraph className="text-blue-700 mb-4">
            Nuestro equipo de servicio al cliente está aquí para ayudarte con tu solicitud de reembolso.
          </Paragraph>
          <div className="space-y-2">
            <div>Email: refunds@tickethub.com</div>
            <div>Teléfono: +1 (555) 123-4567</div>
            <div>Horarios: Lunes-Viernes 9AM-8PM, Sábado-Domingo 10AM-6PM</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Refunds;