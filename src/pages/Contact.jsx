import React from 'react';
import { Typography, Card, Row, Col, Form, Input, Button, message } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const Contact = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Contact form submitted:', values);
    message.success('Thank you for your message! We\'ll get back to you within 24 hours.');
    form.resetFields();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <Title level={1} className="text-4xl font-bold text-gray-800 mb-4">
          Contact Us
        </Title>
        <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions or need assistance? We're here to help! Reach out to us 
          through any of the channels below.
        </Paragraph>
      </div>

      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12}>
          <Card title="Get in Touch" className="h-full">
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter your first name' }]}
                  >
                    <Input placeholder="John" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter your last name' }]}
                  >
                    <Input placeholder="Doe" />
                  </Form.Item>
                </Col>
              </Row>
              
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="john.doe@example.com" />
              </Form.Item>
              
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: 'Please enter a subject' }]}
              >
                <Input placeholder="How can we help you?" />
              </Form.Item>
              
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea rows={6} placeholder="Tell us more about your inquiry..." />
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" className="w-full">
                  Send Message
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
                  <Title level={5} className="mb-1">Email Us</Title>
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
                  <Title level={5} className="mb-1">Call Us</Title>
                  <Text className="text-gray-600">+1 (555) 123-4567</Text>
                  <br />
                  <Text className="text-gray-600">Toll-free: +1 (800) 123-4567</Text>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-4">
                <EnvironmentOutlined className="text-2xl text-red-500" />
                <div>
                  <Title level={5} className="mb-1">Visit Us</Title>
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
                  <Title level={5} className="mb-1">Business Hours</Title>
                  <Text className="text-gray-600">
                    Monday - Friday: 9:00 AM - 8:00 PM<br />
                    Saturday: 10:00 AM - 6:00 PM<br />
                    Sunday: 12:00 PM - 5:00 PM
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