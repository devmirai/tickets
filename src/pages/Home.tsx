import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Input, Select, message, Empty, Alert } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { authService } from '../services/authService';
import { Button } from 'antd';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

// Tipo para el evento
type Event = {
  id: string;
  name: string;
  title: string;
  venue: string;
  address: string;
  city: string;
  country: string;
  availableTickets: number;
  basePrice: number;
  price: number;
  category: string;
  companyId: number;
  createdAt: string;
  description: string;
  eventDate: string;
  date: string;
  imageUrl: string;
  image: string;
  isActive: boolean;
  ticketTypes: any[];
  totalTickets: number;
  updatedAt: string;
  location: string;
  duration?: string;
};

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
      handleSearch(searchParam);
    }
  }, [searchParams, events]);

  useEffect(() => {
    filterEvents();
  }, [events, searchQuery, categoryFilter]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const eventsData = await authService.listEvents();
      console.log('Eventos cargados:', eventsData); // Para debug
      
      if (Array.isArray(eventsData)) {
        setEvents(eventsData);
      } else {
        console.error('La respuesta no es un array:', eventsData);
        setError('Formato de respuesta inesperado del servidor');
      }
    } catch (error) {
      console.error('Error loading events:', error);
      setError('Error al cargar eventos. Por favor, verifica que el servidor esté funcionando.');
      message.error('Error al cargar eventos. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        (event.title?.toLowerCase().includes(query) ||
         event.name?.toLowerCase().includes(query) ||
         event.venue?.toLowerCase().includes(query) ||
         event.city?.toLowerCase().includes(query) ||
         event.category?.toLowerCase().includes(query) ||
         event.description?.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event =>
        event.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Solo mostrar eventos activos
    filtered = filtered.filter(event => event.isActive !== false);

    setFilteredEvents(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(events.map(event => event.category))];
    return categories.filter(Boolean);
  };

  const handleRetry = () => {
    loadEvents();
  };

  if (loading) {
    return <LoadingSpinner tip="Cargando eventos increíbles..." />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Alert
          message="Error al cargar eventos"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" icon={<ReloadOutlined />} onClick={handleRetry}>
              Reintentar
            </Button>
          }
          className="mb-8"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Title level={1} className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Descubre Eventos Increíbles
        </Title>
        <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
          Encuentra y reserva boletos para conciertos, espectáculos, festivales y más. 
          Tu próxima experiencia inolvidable está a solo un clic de distancia.
        </Paragraph>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={16} md={12}>
            <Search
              placeholder="Buscar eventos, ubicaciones o categorías..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
            />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Select
              placeholder="Todas las Categorías"
              size="large"
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="w-full"
            >
              <Option value="all">Todas las Categorías</Option>
              {getUniqueCategories().map(category => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <Title level={3} className="text-gray-700">
          {searchQuery || categoryFilter !== 'all' 
            ? `Se encontraron ${filteredEvents.length} evento${filteredEvents.length !== 1 ? 's' : ''}`
            : `Todos los Eventos (${filteredEvents.length})`
          }
        </Title>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <Row gutter={[24, 24]}>
          {filteredEvents.map(event => (
            <Col xs={24} sm={12} lg={8} xl={6} key={event.id}>
              <EventCard event={event} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-12">
          <Empty
            description={
              events.length === 0 
                ? "No hay eventos disponibles en este momento" 
                : "No se encontraron eventos que coincidan con tus criterios"
            }
            className="text-gray-500"
          >
            {events.length === 0 && (
              <Button type="primary" icon={<ReloadOutlined />} onClick={handleRetry}>
                Recargar eventos
              </Button>
            )}
          </Empty>
        </div>
      )}

      {/* Debug info en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-gray-600">
          <strong>Debug Info:</strong><br />
          Total eventos cargados: {events.length}<br />
          Eventos filtrados: {filteredEvents.length}<br />
          Búsqueda: {searchQuery || 'ninguna'}<br />
          Categoría: {categoryFilter}<br />
          Categorías disponibles: {getUniqueCategories().join(', ')}
        </div>
      )}
    </div>
  );
};

export default Home;