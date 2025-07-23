import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Divider, 
  Radio, 
  Row, 
  Col,
  message,
  Steps,
  Space
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  CreditCardOutlined,
  LockOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { cartUtils } from '../utils/cartUtils';

const { Title, Text } = Typography;
const { Step } = Steps;

const Checkout = () => {
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const navigate = useNavigate();

  useEffect(() => {
    const items = cartUtils.getCart();
    if (items.length === 0) {
      message.warning('Your cart is empty');
      navigate('/cart');
      return;
    }
    setCartItems(items);
  }, [navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        ...values,
        cartItems,
        paymentMethod,
        orderTotal: cartUtils.getCartTotal() + 5,
        orderId: `ORD-${Date.now()}`,
        orderDate: new Date().toISOString()
      };
      
      // Store order data for confirmation page
      localStorage.setItem('lastOrder', JSON.stringify(orderData));
      
      // Clear cart
      cartUtils.clearCart();
      window.dispatchEvent(new Event('cartUpdated'));
      
      message.success('Order placed successfully!');
      navigate('/confirmation');
      
    } catch (error) {
      message.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    }).catch(() => {
      message.error('Please fill in all required fields');
    });
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const cartTotal = cartUtils.getCartTotal();
  const serviceFee = 5;
  const totalAmount = cartTotal + serviceFee;

  const steps = [
    {
      title: 'Personal Info',
      content: (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="John" 
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Doe" 
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="john.doe@example.com" 
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input 
                prefix={<PhoneOutlined />} 
                placeholder="+1 (555) 123-4567" 
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
      )
    },
    {
      title: 'Payment',
      content: (
        <div>
          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            initialValue="credit-card"
          >
            <Radio.Group 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <Radio value="credit-card" className="w-full p-4 border rounded">
                  <CreditCardOutlined className="mr-2" />
                  Credit/Debit Card
                </Radio>
                <Radio value="paypal" className="w-full p-4 border rounded">
                  PayPal
                </Radio>
                <Radio value="apple-pay" className="w-full p-4 border rounded">
                  Apple Pay
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          {paymentMethod === 'credit-card' && (
            <div className="mt-6 space-y-4">
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="cardNumber"
                    label="Card Number"
                    rules={[{ required: true, message: 'Please enter your card number' }]}
                  >
                    <Input 
                      prefix={<CreditCardOutlined />}
                      placeholder="1234 5678 9012 3456" 
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="expiryDate"
                    label="Expiry Date"
                    rules={[{ required: true, message: 'Please enter expiry date' }]}
                  >
                    <Input 
                      placeholder="MM/YY" 
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="cvv"
                    label="CVV"
                    rules={[{ required: true, message: 'Please enter CVV' }]}
                  >
                    <Input 
                      prefix={<LockOutlined />}
                      placeholder="123" 
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="cardName"
                    label="Name on Card"
                    rules={[{ required: true, message: 'Please enter name on card' }]}
                  >
                    <Input 
                      placeholder="John Doe" 
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/cart')}
        className="mb-6"
      >
        Back to Cart
      </Button>

      <Title level={2} className="text-center mb-8">Checkout</Title>

      <Row gutter={32}>
        {/* Checkout Form */}
        <Col xs={24} lg={14}>
          <Card className="shadow-md">
            <Steps current={currentStep} className="mb-8">
              {steps.map(step => (
                <Step key={step.title} title={step.title} />
              ))}
            </Steps>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <div className="min-h-[400px]">
                {steps[currentStep].content}
              </div>

              <Divider />

              <div className="flex justify-between">
                {currentStep > 0 && (
                  <Button size="large" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <Button type="primary" size="large" onClick={nextStep} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="primary" 
                    size="large" 
                    htmlType="submit"
                    loading={loading}
                    className="ml-auto"
                  >
                    Place Order
                  </Button>
                )}
              </div>
            </Form>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col xs={24} lg={10}>
          <Card title="Order Summary" className="shadow-md sticky top-24">
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <Text strong>{item.name}</Text>
                    <div className="text-gray-500 text-sm">
                      Qty: {item.quantity} × ${item.price}
                    </div>
                  </div>
                  <Text strong className="text-blue-600">
                    ${item.totalPrice}
                  </Text>
                </div>
              ))}
              
              <Divider />
              
              <div className="flex justify-between">
                <Text>Subtotal:</Text>
                <Text strong>${cartTotal}</Text>
              </div>
              
              <div className="flex justify-between">
                <Text>Service Fee:</Text>
                <Text strong>${serviceFee}</Text>
              </div>
              
              <Divider />
              
              <div className="flex justify-between">
                <Title level={4}>Total:</Title>
                <Title level={4} className="text-blue-600">${totalAmount}</Title>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;