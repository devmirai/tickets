import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Typography, 
  Button, 
  InputNumber, 
  Card, 
  Tag, 
  Divider, 
  message, 
  Breadcrumb,
  Space
} from 'antd';
import { 
  CalendarOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined,
  ShoppingCartOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { eventService } from '../services/eventService';
import { cartUtils } from '../utils/cartUtils';

const { Title, Paragraph, Text } = Typography;

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEventById(id);
      setEvent(response.data);
    } catch (error) {
      message.error('Evento no encontrado');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      cartUtils.addToCart(event, quantity);
      message.success(`¡Agregado${quantity > 1 ? 's' : ''} ${quantity} boleto${quantity > 1 ? 's' : ''} al carrito!`);
      
      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new Event('cartUpdated'));
      
      // Optional: Navigate to cart
      // navigate('/cart');
    } catch (error) {
      message.error('Error al agregar al carrito');
    } finally {
      setAddingToCart(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Música': 'blue',
      'Comedia': 'orange',
      'Teatro': 'purple',
      'Deportes': 'green'
    };
    return colors[category] || 'default';
  };

  if (loading) {
    return <LoadingSpinner tip="Cargando detalles del evento..." />;
  }

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <Title level={2}>Evento No Encontrado</Title>
        <Button type="primary" onClick={() => navigate('/')}>
          Volver al Inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>
          <a onClick={() => navigate('/')}>Inicio</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Eventos</Breadcrumb.Item>
        <Breadcrumb.Item>{event.name}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Back Button */}
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        Volver a Eventos
      </Button>

      <Row gutter={[32, 32]}>
        {/* Event Image */}
        <Col xs={24} lg={12}>
          <div className="relative">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <Tag
              color={getCategoryColor(event.category)}
              className="absolute top-4 right-4 text-sm px-3 py-1"
            >
              {event.category}
            </Tag>
          </div>
        </Col>

        {/* Event Details */}
        <Col xs={24} lg={12}>
          <div className="h-full flex flex-col">
            <Title level={1} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {event.name}
            </Title>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-lg text-gray-600">
                <CalendarOutlined className="mr-3 text-blue-500" />
                <Text strong>{formatDate(event.date)}</Text>
              </div>
              
              <div className="flex items-center text-lg text-gray-600">
                <EnvironmentOutlined className="mr-3 text-red-500" />
                <Text strong>{event.location}</Text>
              </div>
              
              <div className="flex items-center text-lg text-gray-600">
                <ClockCircleOutlined className="mr-3 text-green-500" />
                <Text strong>{event.duration}</Text>
              </div>
            </div>

            <Divider />

            <div className="mb-6">
              <Title level={4} className="text-gray-800 mb-3">Acerca de Este Evento</Title>
              <Paragraph className="text-gray-600 text-base leading-relaxed">
                {event.description}
              </Paragraph>
            </div>

            <Divider />

            {/* Pricing and Purchase */}
            <Card className="bg-gray-50 border-0 shadow-sm">
              <div className="text-center mb-4">
                <Title level={2} className="text-blue-600 mb-2">
                  ${event.price}
                </Title>
                <Text className="text-gray-500 text-lg">por boleto</Text>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-4">
                  <Text strong className="text-lg">Cantidad:</Text>
                  <InputNumber
                    min={1}
                    max={10}
                    value={quantity}
                    onChange={setQuantity}
                    size="large"
                    className="w-20"
                  />
                </div>

                <div className="text-center">
                  <Text className="text-xl">
                    Total: <Text strong className="text-blue-600">${event.price * quantity}</Text>
                  </Text>
                </div>

                <Space direction="vertical" className="w-full" size="middle">
                  <Button
                    type="primary"
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    loading={addingToCart}
                    className="w-full h-12 text-lg font-semibold"
                  >
                    Agregar al Carrito
                  </Button>
                  
                  <Button
                    size="large"
                    onClick={() => navigate('/cart')}
                    className="w-full h-12 text-lg"
                  >
                    Ver Carrito
                  </Button>
                </Space>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EventDetail;