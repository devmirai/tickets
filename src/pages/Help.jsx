import React from 'react';
import { Typography, Collapse, Card, Input, Button } from 'antd';
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { Search } = Input;

const Help = () => {
  const faqData = [
    {
      key: '1',
      question: '¿Cómo compro boletos?',
      answer: 'Explora eventos en nuestra página principal, selecciona un evento, elige tu cantidad y haz clic en "Agregar al Carrito". Luego procede al checkout para completar tu compra con procesamiento de pago seguro.'
    },
    {
      key: '2',
      question: '¿Puedo cancelar o reembolsar mis boletos?',
      answer: 'Las políticas de reembolso varían según el evento. La mayoría de los boletos pueden ser reembolsados hasta 48 horas antes del evento. Consulta la política de reembolso específica del evento en la página de detalles del evento o contacta a nuestro equipo de soporte.'
    },
    {
      key: '3',
      question: '¿Cómo recibiré mis boletos?',
      answer: 'Después de la compra, recibirás un email de confirmación con tus boletos digitales. También puedes descargarlos desde tu página de confirmación. Presenta los boletos en tu dispositivo móvil o imprímelos.'
    },
    {
      key: '4',
      question: '¿Mi información de pago está segura?',
      answer: '¡Sí! Utilizamos encriptación SSL estándar de la industria y procesadores de pago seguros para proteger tu información personal y financiera. Nunca almacenamos los detalles completos de tu tarjeta de crédito.'
    },
    {
      key: '5',
      question: '¿Qué pasa si un evento es cancelado?',
      answer: 'Si un evento es cancelado por el organizador, recibirás un reembolso completo automático dentro de 5-7 días hábiles. También te notificaremos por email sobre la cancelación y el estado del reembolso.'
    },
    {
      key: '6',
      question: '¿Puedo transferir mis boletos a otra persona?',
      answer: 'La mayoría de los boletos pueden ser transferidos a otra persona. Puedes hacer esto a través del panel de tu cuenta o contactando a nuestro equipo de soporte. Algunos eventos pueden tener restricciones en las transferencias.'
    },
    {
      key: '7',
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos todas las tarjetas de crédito principales (Visa, MasterCard, American Express), PayPal y Apple Pay. Todas las transacciones se procesan de forma segura a través de nuestros socios de pago.'
    },
    {
      key: '8',
      question: '¿Cómo contacto al servicio al cliente?',
      answer: 'Puedes contactar a nuestro equipo de soporte por email a support@tickethub.com, llamarnos al +1 (555) 123-4567, o usar el formulario de contacto en nuestra página de Contacto. Típicamente respondemos dentro de 24 horas.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Centro de Ayuda
        </Title>
        <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
          Encuentra respuestas a preguntas comunes y obtén la ayuda que necesitas.
        </Paragraph>
      </div>

      <Card className="mb-8">
        <div className="text-center">
          <Title level={3} className="mb-4">Buscar Ayuda</Title>
          <Search
            placeholder="¿En qué podemos ayudarte?"
            enterButton={<SearchOutlined />}
            size="large"
            className="max-w-md"
          />
        </div>
      </Card>

      <Card title={
        <div className="flex items-center">
          <QuestionCircleOutlined className="mr-2 text-blue-500" />
          Preguntas Frecuentes
        </div>
      }>
        <Collapse accordion>
          {faqData.map(faq => (
            <Panel header={faq.question} key={faq.key}>
              <Paragraph className="text-gray-700 mb-0">
                {faq.answer}
              </Paragraph>
            </Panel>
          ))}
        </Collapse>
      </Card>

      <Card className="mt-8 bg-blue-50 border-blue-200">
        <div className="text-center">
          <Title level={4} className="text-blue-800 mb-3">
            ¿Aún necesitas ayuda?
          </Title>
          <Paragraph className="text-blue-700 mb-4">
            ¿No encuentras lo que buscas? ¡Nuestro equipo de soporte está aquí para ayudarte!
          </Paragraph>
          <Button type="primary" size="large">
            Contactar Soporte
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Help;