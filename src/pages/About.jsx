import React from 'react';
import { Typography, Card, Row, Col, Avatar } from 'antd';
import { TeamOutlined, TrophyOutlined, HeartOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          About TicketHub
        </Title>
        <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're passionate about connecting people with amazing experiences. Since 2020, 
          TicketHub has been the trusted platform for discovering and booking tickets to 
          the world's best events.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]} className="mb-12">
        <Col xs={24} md={8}>
          <Card className="text-center h-full">
            <TeamOutlined className="text-4xl text-blue-500 mb-4" />
            <Title level={3}>Our Mission</Title>
            <Paragraph className="text-gray-600">
              To make discovering and attending events effortless, bringing people 
              together through shared experiences and unforgettable moments.
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card className="text-center h-full">
            <TrophyOutlined className="text-4xl text-green-500 mb-4" />
            <Title level={3}>Our Vision</Title>
            <Paragraph className="text-gray-600">
              To be the world's leading event ticketing platform, known for 
              reliability, innovation, and exceptional customer service.
            </Paragraph>
          </Card>
        </Col>
        
        <Col xs={24} md={8}>
          <Card className="text-center h-full">
            <HeartOutlined className="text-4xl text-red-500 mb-4" />
            <Title level={3}>Our Values</Title>
            <Paragraph className="text-gray-600">
              Trust, transparency, and customer satisfaction drive everything we do. 
              We believe every event should be accessible and every experience memorable.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Card className="bg-gray-50">
        <Title level={2} className="text-center mb-6">Our Story</Title>
        <Paragraph className="text-lg text-gray-700 mb-4">
          Founded in 2020 by a team of event enthusiasts, TicketHub was born from the 
          simple idea that finding and buying event tickets should be easy, secure, and enjoyable.
        </Paragraph>
        <Paragraph className="text-lg text-gray-700 mb-4">
          What started as a small startup has grown into a trusted platform serving millions 
          of customers worldwide. We've facilitated over 10 million ticket sales and helped 
          people discover everything from intimate jazz concerts to massive music festivals.
        </Paragraph>
        <Paragraph className="text-lg text-gray-700">
          Today, we continue to innovate and expand our services, always keeping our customers 
          at the heart of everything we do. Thank you for being part of our journey.
        </Paragraph>
      </Card>
    </div>
  );
};

export default About;