import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Input, Select, message, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSearchParams } from 'react-router-dom';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { eventService } from '../services/eventService';

const { Title, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
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
      const response = await eventService.getAllEvents();
      setEvents(response.data);
    } catch (error) {
      message.error('Failed to load events. Please try again.');
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
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event =>
        event.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredEvents(filtered);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(events.map(event => event.category))];
    return categories;
  };

  if (loading) {
    return <LoadingSpinner tip="Loading amazing events..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <Title level={1} className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Discover Amazing Events
        </Title>
        <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find and book tickets for concerts, shows, festivals, and more. 
          Your next unforgettable experience is just a click away.
        </Paragraph>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={16} md={12}>
            <Search
              placeholder="Search events, locations, or categories..."
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
              placeholder="All Categories"
              size="large"
              value={categoryFilter}
              onChange={handleCategoryChange}
              className="w-full"
            >
              <Option value="all">All Categories</Option>
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
            ? `Found ${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''}`
            : `All Events (${filteredEvents.length})`
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
            description="No events found matching your criteria"
            className="text-gray-500"
          />
        </div>
      )}
    </div>
  );
};

export default Home;