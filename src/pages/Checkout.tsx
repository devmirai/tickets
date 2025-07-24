import React, { useEffect, useState } from 'react';
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
  Space,
  InputNumber
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
import { API_ROUTES } from '../services/apiConfig';

const { Title, Text } = Typography;
const { Step } = Steps;

const Checkout = () => {
  const [form] = Form.useForm();
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(0); // Solo método de pago
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
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

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const token = localStorage.getItem('tickethub_token');
      if (!token) return;
      try {
        const response = await fetch(API_ROUTES.paymentMethods, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (Array.isArray(data)) {
          setPaymentMethods(data);
          if (data.length > 0) setSelectedPaymentMethod(data.find(m => m.is_default) || data[0]);
        }
      } catch (err) {
        setPaymentMethods([]);
      }
    };
    fetchPaymentMethods();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const token = localStorage.getItem('tickethub_token');
      if (!token) {
        message.error('No estás autenticado.');
        setLoading(false);
        return;
      }

      // Construye el array de items para la orden
      const items = cartItems.map(item => ({
        eventId: item.eventId || item.id,
        ticketTypeId: item.ticketTypeId || 1,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.totalPrice
      }));

      // Determina el método de pago (string, no objeto)
      const paymentMethod =
        paymentMethods.length > 0
          ? (selectedPaymentMethod?.type === 'paypal' ? 'paypal' : 'tarjeta')
          : paymentMethod;

      // Dirección de facturación como string
      const billingAddress = "Calle Falsa 123";

      const orderPayload = {
        items,
        paymentMethod,
        billingAddress
      };

      const response = await fetch(API_ROUTES.orders, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      if (!response.ok) {
        throw new Error('Error al crear la orden');
      }

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
      title: 'Pago',
      content: (
        <div>
          {paymentMethods.length > 0 ? (
            <Form.Item
              name="paymentMethod"
              label="Selecciona un método de pago"
              rules={[{ required: true, message: 'Selecciona un método de pago' }]}
              initialValue={selectedPaymentMethod?.id}
            >
              <Radio.Group
                value={selectedPaymentMethod?.id}
                onChange={e => setSelectedPaymentMethod(paymentMethods.find(m => m.id === e.target.value))}
                className="w-full"
              >
                <Space direction="vertical" className="w-full">
                  {paymentMethods.map(method => (
                    <Radio key={method.id} value={method.id} className="w-full p-4 border rounded">
                      {method.type === 'paypal'
                        ? <>PayPal {method.is_default && <span>(Predeterminado)</span>}</>
                        : <>
                            {method.provider} {method.card_type} ****{method.last_four_digits} {method.is_default && <span>(Predeterminado)</span>}
                          </>
                      }
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>
          ) : (
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
          )}

          {/* Si el usuario selecciona "credit-card" y no tiene métodos guardados, muestra el formulario manual */}
          {paymentMethods.length === 0 && paymentMethod === 'credit-card' && (
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
                      Cant: 
                      <InputNumber
                        min={1}
                        max={item.availableTickets || 1}
                        value={item.quantity}
                        disabled
                        className="ml-2"
                      /> 
                      × S/{item.price}
                      {item.quantity > (item.availableTickets || 1) && (
                        <Text type="danger" className="ml-2">
                          (Máximo {item.availableTickets} disponibles)
                        </Text>
                      )}
                    </div>
                  </div>
                  <Text strong className="text-blue-600">
                    S/{item.totalPrice}
                  </Text>
                </div>
              ))}
              
              <Divider />
              
              <div className="flex justify-between">
                <Text>Subtotal:</Text>
                <Text strong>S/{cartTotal}</Text>
              </div>
              
              <div className="flex justify-between">
                <Text>Tarifa de Servicio:</Text>
                <Text strong>S/${serviceFee}</Text>
              </div>
              
              <Divider />
              
              <div className="flex justify-between">
                <Title level={4}>Total:</Title>
                <Title level={4} className="text-blue-600">S/{totalAmount}</Title>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;