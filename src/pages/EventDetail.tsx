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
  Space,
  Alert
} from 'antd';
import { 
  CalendarOutlined, 
  EnvironmentOutlined, 
  ClockCircleOutlined,
  ShoppingCartOutlined,
  ArrowLeftOutlined,
  UserGroupOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import LoadingSpinner from '../components/LoadingSpinner';
import { eventService } from '../services/eventService';
import { cartUtils } from '../utils/cartUtils';

const { Title, Paragraph, Text } = Typography;

// Tipo para el evento
interface Event {
  id: string;
  name: string;
  title: string;
  description: string;
  date: string;
  eventDate: string;
  location: string;
  venue: string;
  city: string;
  category: string;
  price: number;
  basePrice: number;
  image: string;
  imageUrl: string;
  availableTickets: number;
  totalTickets: number;
  duration?: string;
  isActive: boolean;
  address: string;
  country: string;
}

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await eventService.getEventById(id);
      
      if (response.data) {
        setEvent(response.data);
      } else {
        setError(response.error || 'Evento no encontrado');
        message.error('Evento no encontrado');
      }
    } catch (error) {
      console.error('Error loading event:', error);
      setError('Error al cargar el evento');
      message.error('Error al cargar el evento');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!event) return;
    
    setAddingToCart(true);
    try {
      // Verificar disponibilidad
      if (event.availableTickets < quantity) {
        message.error(`Solo hay ${event.availableTickets} boletos disponibles`);
        return;
      }

      cartUtils.addToCart(event, quantity);
      message.success(`¡Agregado${quantity > 1 ? 's' : ''} ${quantity} boleto${quantity > 1 ? 's' : ''} al carrito!`);
      
      // Dispatch custom event to update cart count in header
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      message.error('Error al agregar al carrito');
    } finally {
      setAddingToCart(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Música': 'blue',
      'Concierto': 'blue',
      'Comedia': 'orange',
      'Teatro': 'purple',
      'Deportes': 'green',
      'Feria': 'cyan',
      'Conferencia': 'geekblue'
    };
    return colors[category] || 'default';
  };

  const handleRetry = () => {
    loadEvent();
  };

  if (loading) {
    return <LoadingSpinner tip="Cargando detalles del evento..." />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          Volver a Eventos
        </Button>
        
        <Alert
          message="Error al cargar el evento"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" icon={<ReloadOutlined />} onClick={handleRetry}>
              Reintentar
            </Button>
          }
        />
      </div>
    );
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

  const eventName = event.name || event.title;
  const eventPrice = event.price || event.basePrice;
  const eventDate = event.date || event.eventDate;
  const eventImage = event.image || event.imageUrl;
  const maxQuantity = Math.min(10, event.availableTickets);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>
          <a onClick={() => navigate('/')}>Inicio</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Eventos</Breadcrumb.Item>
        <Breadcrumb.Item>{eventName}</Breadcrumb.Item>
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
              src={eventImage || 'https://via.placeholder.com/600x400?text=Evento'}
              alt={eventName}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/600x400?text=Evento';
              }}
            />
            <Tag
              color={getCategoryColor(event.category)}
              className="absolute top-4 right-4 text-sm px-3 py-1"
            >
              {event.category}
            </Tag>

            {/* Mostrar estado de disponibilidad */}
            <div className="absolute top-4 left-4">
              {event.availableTickets > 100 ? (
                <Tag color="green">Disponible</Tag>
              ) : event.availableTickets > 10 ? (
                <Tag color="orange">Últimos boletos</Tag>
              ) : event.availableTickets > 0 ? (
                <Tag color="red">Solo {event.availableTickets} disponibles</Tag>
              ) : (
                <Tag color="red">Agotado</Tag>
              )}
            </div>
          </div>
        </Col>

        {/* Event Details */}
        <Col xs={24} lg={12}>
          <div className="h-full flex flex-col">
            <Title level={1} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {eventName}
            </Title>

            <div className="space-y-4 mb-6">
              <div className="flex items-center text-lg text-gray-600">
                <CalendarOutlined className="mr-3 text-blue-500" />
                <Text strong>{formatDate(eventDate)}</Text>
              </div>
              
              <div className="flex items-center text-lg text-gray-600">
                <EnvironmentOutlined className="mr-3 text-red-500" />
                <div>
                  <Text strong>{event.venue}</Text>
                  <br />
                  <Text className="text-gray-500">{event.address}, {event.city}</Text>
                </div>
              </div>
              
              {event.duration && (
                <div className="flex items-center text-lg text-gray-600">
                  <ClockCircleOutlined className="mr-3 text-green-500" />
                  <Text strong>{event.duration}</Text>
                </div>
              )}

              <div className="flex items-center text-lg text-gray-600">
                <UserGroupOutlined className="mr-3 text-purple-500" />
                <Text strong>{event.availableTickets} de {event.totalTickets} disponibles</Text>
              </div>
            </div>

            <Divider />

            <div className="mb-6">
              <Title level={4} className="text-gray-800 mb-3">Acerca de Este Evento</Title>
              <Paragraph className="text-gray-600 text-base leading-relaxed">
                {event.description || 'Descripción del evento no disponible.'}
              </Paragraph>
            </div>

            <Divider />

            {/* Pricing and Purchase */}
            <Card className="bg-gray-50 border-0 shadow-sm">
              <div className="text-center mb-4">
                <Title level={2} className="text-blue-600 mb-2">
                  ${eventPrice?.toLocaleString()}
                </Title>
                <Text className="text-gray-500 text-lg">por boleto</Text>
              </div>

              {event.availableTickets > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <Text strong className="text-lg">Cantidad:</Text>
                    <InputNumber
                      min={1}
                      max={maxQuantity}
                      value={quantity}
                      onChange={(value) => setQuantity(value || 1)}
                      size="large"
                      className="w-20"
                    />
                  </div>

                  <div className="text-center">
                    <Text className="text-xl">
                      Total: <Text strong className="text-blue-600">${(eventPrice * quantity).toLocaleString()}</Text>
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
              ) : (
                <div className="text-center">
                  <Title level={4} className="text-red-500 mb-4">Evento Agotado</Title>
                  <Text className="text-gray-500">
                    Lo sentimos, no hay boletos disponibles para este evento.
                  </Text>
                  <br />
                  <Button
                    size="large"
                    onClick={() => navigate('/')}
                    className="w-full h-12 text-lg mt-4"
                  >
                    Ver Otros Eventos
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </Col>
      </Row>

      {/* Debug info en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-gray-600">
          <strong>Debug Info:</strong><br />
          ID del evento: {event.id}<br />
          Boletos disponibles: {event.availableTickets}<br />
          Precio: ${eventPrice}<br />
          Fecha: {eventDate}<br />
          Activo: {event.isActive ? 'Sí' : 'No'}
        </div>
      )}
    </div>
  );
};

export default EventDetail;