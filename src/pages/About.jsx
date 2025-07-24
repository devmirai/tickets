import React from 'react';
import { Typography, Card, Row, Col, Avatar } from 'antd';
import { TeamOutlined, TrophyOutlined, HeartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Acerca de TicketHub
        </Title>
        <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
          Somos apasionados por conectar a las personas con experiencias increíbles. Desde 2020, 
          TicketHub ha sido la plataforma confiable para descubrir y reservar boletos para 
          los mejores eventos del mundo.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]} className="mb-12">
        <Col xs={24} md={8}>
          <Card className="text-center h-full">
            <TeamOutlined className="text-4xl text-blue-500 mb-4" />
            <Title level={3}>Nuestra Misión</Title>
            <Paragraph className="text-gray-600">
              Hacer que descubrir y asistir a eventos sea sin esfuerzo, uniendo a las personas 
              a través de experiencias compartidas y momentos inolvidables.
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card className="text-center h-full">
            <TrophyOutlined className="text-4xl text-green-500 mb-4" />
            <Title level={3}>Nuestra Visión</Title>
            <Paragraph className="text-gray-600">
              Ser la plataforma líder mundial de venta de boletos para eventos, conocida por 
              su confiabilidad, innovación y servicio al cliente excepcional.
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card className="text-center h-full">
            <HeartOutlined className="text-4xl text-red-500 mb-4" />
            <Title level={3}>Nuestros Valores</Title>
            <Paragraph className="text-gray-600">
              La confianza, transparencia y satisfacción del cliente impulsan todo lo que hacemos. 
              Creemos que cada evento debe ser accesible y cada experiencia memorable.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Card className="bg-gray-50">
        <Title level={2} className="text-center mb-6">Nuestra Historia</Title>
        <Paragraph className="text-lg text-gray-700 mb-4">
          Fundada en 2020 por un equipo de entusiastas de eventos, TicketHub nació de la 
          idea simple de que encontrar y comprar boletos para eventos debería ser fácil, seguro y agradable.
        </Paragraph>
        <Paragraph className="text-lg text-gray-700 mb-4">
          Lo que comenzó como una pequeña startup ha crecido hasta convertirse en una plataforma confiable que sirve a millones 
          de clientes en todo el mundo. Hemos facilitado más de 10 millones de ventas de boletos y ayudado 
          a las personas a descubrir desde conciertos íntimos de jazz hasta festivales de música masivos.
        </Paragraph>
        <Paragraph className="text-lg text-gray-700">
          Hoy, continuamos innovando y expandiendo nuestros servicios, siempre manteniendo a nuestros clientes 
          en el corazón de todo lo que hacemos. Gracias por ser parte de nuestro viaje.
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;