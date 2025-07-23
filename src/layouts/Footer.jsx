import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, MailOutlined } from '@ant-design/icons';

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
              Your premier destination for event tickets. Discover amazing events and book your tickets with ease.
            </Text>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">Quick Links</Title>
            <div className="flex flex-col space-y-2">
              <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
              <a href="/events" className="text-gray-300 hover:text-white transition-colors">Events</a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a>
              <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">Support</Title>
            <div className="flex flex-col space-y-2">
              <a href="/help" className="text-gray-300 hover:text-white transition-colors">Help Center</a>
              <a href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="/refunds" className="text-gray-300 hover:text-white transition-colors">Refund Policy</a>
            </div>
          </Col>
          
          <Col xs={24} sm={12} md={6}>
            <Title level={5} className="text-white mb-4">Connect With Us</Title>
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
            © 2025 TicketHub. All rights reserved.
          </Text>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;