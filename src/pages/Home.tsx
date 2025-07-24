import React, { useState, useEffect } from 'react';

type Event = {
  id: number;
  title: string;
  address: string;
  availableTickets: number;
  basePrice: number;
  category: string;
  city: string;
  companyId: number;
  country: string;
  createdAt: string;
  description: string;
  eventDate: string;
  imageUrl: string;
  isActive: boolean;
  ticketTypes: any[];
  totalTickets: number;
  updatedAt: string;
  venue: string;
};
import { Row, Col, Typography, Input, Select, message, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { authService } from '../services/authService';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
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
      const events = await authService.listEvents();
      setEvents(events);
    } catch (error) {
      message.error('Error al cargar eventos. Por favor, inténtalo de nuevo.');
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event =>
        event.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

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

  if (loading) {
    return <LoadingSpinner tip="Cargando eventos increíbles..." />;
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
            description="No se encontraron eventos que coincidan con tus criterios"
            className="text-gray-500"
          />
        </div>
      )}
    </div>
  );
};

export default Home;