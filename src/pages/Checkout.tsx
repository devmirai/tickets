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
      message.warning('Tu carrito está vacío');
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
      
      message.success('¡Orden realizada exitosamente!');
      navigate('/confirmation');
      
    } catch (error) {
      message.error('Error en el pago. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    form.validateFields().then(() => {
      setCurrentStep(currentStep + 1);
    }).catch(() => {
      message.error('Por favor completa todos los campos requeridos');
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
      title: 'Info Personal',
      content: (
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="Nombre"
              rules={[{ required: true, message: 'Por favor ingresa tu nombre' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Juan" 
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Apellido"
              rules={[{ required: true, message: 'Por favor ingresa tu apellido' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="Pérez" 
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Correo Electrónico"
              rules={[
                { required: true, message: 'Por favor ingresa tu correo electrónico' },
                { type: 'email', message: 'Por favor ingresa un correo electrónico válido' }
              ]}
            >
              <Input 
                prefix={<MailOutlined />} 
                placeholder="juan.perez@ejemplo.com" 
                size="large"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="phone"
              label="Número de Teléfono"
              rules={[{ required: true, message: 'Por favor ingresa tu número de teléfono' }]}
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
      title: 'Pago',
      content: (
        <div>
          <Form.Item
            name="paymentMethod"
            label="Método de Pago"
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
                  Tarjeta de Crédito/Débito
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
                    label="Número de Tarjeta"
                    rules={[{ required: true, message: 'Por favor ingresa el número de tu tarjeta' }]}
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
                    label="Fecha de Vencimiento"
                    rules={[{ required: true, message: 'Por favor ingresa la fecha de vencimiento' }]}
                  >
                    <Input 
                      placeholder="MM/AA" 
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="cvv"
                    label="CVV"
                    rules={[{ required: true, message: 'Por favor ingresa el CVV' }]}
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
                    label="Nombre en la Tarjeta"
                    rules={[{ required: true, message: 'Por favor ingresa el nombre en la tarjeta' }]}
                  >
                    <Input 
                      placeholder="Juan Pérez" 
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
        Volver al Carrito
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
                    Anterior
                  </Button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <Button type="primary" size="large" onClick={nextStep} className="ml-auto">
                    Siguiente
                  </Button>
                ) : (
                  <Button 
                    type="primary" 
                    size="large" 
                    htmlType="submit"
                    loading={loading}
                    className="ml-auto"
                  >
                    Realizar Pedido
                  </Button>
                )}
              </div>
            </Form>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col xs={24} lg={10}>
          <Card title="Resumen del Pedido" className="shadow-md sticky top-24">
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex-1">
                    <Text strong>{item.name}</Text>
                    <div className="text-gray-500 text-sm">
                      Cant: {item.quantity} × ${item.price}
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
                <Text>Tarifa de Servicio:</Text>
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