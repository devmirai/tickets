import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Footer: AntFooter } = Layout;
const { Title, Text } = Typography;

const Footer = () => {
  return (
    <AntFooter className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto py-8">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} md={6}>
            <Title level={4} className="text-white mb-4">TicketHub</Title>
            <Text className="text-gray-300">
              Tu destino principal para boletos de eventos. Descubre eventos increíbles y reserva tus boletos con facilidad.
            </Text>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">Enlaces Rápidos</Title>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Inicio</Link>
              <Link to="/" className="text-gray-300 hover:text-white transition-colors">Eventos</Link>
              <Link to="/about" className="text-gray-300 hover:text-white transition-colors">Acerca de Nosotros</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contacto</Link>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">Soporte</Title>
            <div className="flex flex-col space-y-2">
              <Link to="/help" className="text-gray-300 hover:text-white transition-colors">Centro de Ayuda</Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Términos de Servicio</Link>
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Política de Privacidad</Link>
              <Link to="/refunds" className="text-gray-300 hover:text-white transition-colors">Política de Reembolsos</Link>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">Conéctate con Nosotros</Title>
            <div className="flex space-x-4 mb-4">
              <FacebookOutlined className="text-gray-300 hover:text-blue-500 text-xl cursor-pointer transition-colors" />
              <TwitterOutlined className="text-gray-300 hover:text-blue-400 text-xl cursor-pointer transition-colors" />
              <InstagramOutlined className="text-gray-300 hover:text-pink-500 text-xl cursor-pointer transition-colors" />
              <MailOutlined className="text-gray-300 hover:text-green-500 text-xl cursor-pointer transition-colors" />
            </div>
            <Text className="text-gray-300">
              <MailOutlined className="mr-2" />
              info@tickethub.com
            </Text>
          </Col>
        </Row>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <Text className="text-gray-400">
            © 2025 TicketHub. Todos los derechos reservados.
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;