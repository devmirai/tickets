import React from 'react';
import { Typography, Card, Row, Col, Form, Input, Button, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Contact form submitted:', values);
    message.success('¡Gracias por tu mensaje! Te responderemos dentro de 24 horas.');
    form.resetFields();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Contáctanos
        </Title>
        <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
          ¿Tienes preguntas o necesitas asistencia? ¡Estamos aquí para ayudarte! Contáctanos 
          a través de cualquiera de los canales a continuación.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <Card title="Ponte en Contacto" className="h-full">
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label="Nombre"
                    rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
                  >
                    <Input placeholder="Juan" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label="Apellido"
                    rules={[{ required: true, message: 'Por favor ingresa tu apellido' }]}
                  >
                    <Input placeholder="Pérez" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="email"
                label="Correo Electrónico"
                rules={[
                  { required: true, message: 'Por favor ingresa tu correo electrónico' },
                  { type: 'email', message: 'Por favor ingresa un correo electrónico válido' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="juan.perez@ejemplo.com" />
              </Form.Item>
              
              <Form.Item
                name="subject"
                label="Asunto"
                rules={[{ required: true, message: 'Por favor ingresa un asunto' }]}
              >
                <Input placeholder="¿Cómo podemos ayudarte?" />
              </Form.Item>
              
              <Form.Item
                name="message"
                label="Mensaje"
                rules={[{ required: true, message: 'Por favor ingresa tu mensaje' }]}
              >
                <TextArea rows={6} placeholder="Cuéntanos más sobre tu consulta..." />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" className="w-full">
                  Enviar Mensaje
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <div className="space-y-6">
            <Card>
              <div className="flex items-center space-x-4">
                <MailOutlined className="text-2xl text-blue-500" />
                <div>
                  <Title level={5} className="mb-1">Envíanos un Email</Title>
                  <Text className="text-gray-600">info@tickethub.com</Text>
                  <br />
                  <Text className="text-gray-600">support@tickethub.com</Text>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-4">
                <PhoneOutlined className="text-2xl text-green-500" />
                <div>
                  <Title level={5} className="mb-1">Llámanos</Title>
                  <Text className="text-gray-600">+1 (555) 123-4567</Text>
                  <br />
                  <Text className="text-gray-600">Línea gratuita: +1 (800) 123-4567</Text>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-4">
                <EnvironmentOutlined className="text-2xl text-red-500" />
                <div>
                  <Title level={5} className="mb-1">Visítanos</Title>
                  <Text className="text-gray-600">
                    123 Event Street<br />
                    Downtown District<br />
                    New York, NY 10001
                  </Text>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-4">
                <ClockCircleOutlined className="text-2xl text-purple-500" />
                <div>
                  <Title level={5} className="mb-1">Horarios de Atención</Title>
                  <Text className="text-gray-600">
                    Lunes - Viernes: 9:00 AM - 8:00 PM<br />
                    Sábado: 10:00 AM - 6:00 PM<br />
                    Domingo: 12:00 PM - 5:00 PM
                  </Text>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;