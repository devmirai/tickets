import React from 'react';
import { Card, Button, Tag, Typography } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const { Text } = Typography;

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Music': 'blue',
      'Comedy': 'orange',
      'Theater': 'purple',
      'Sports': 'green'
    };
    return colors[category] || 'default';
  };

  return (
    <Card
      hoverable
      className="h-full shadow-md hover:shadow-lg transition-shadow duration-300"
      cover={
        <div className="relative overflow-hidden h-48">
          <img
            alt={event.name}
            src={event.image}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          <Tag
            color={getCategoryColor(event.category)}
            className="absolute top-3 right-3"
          >
            {event.category}
          </Tag>
        </div>
      }
      actions={[
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/event/${event.id}`)}
          className="w-full mx-4"
        >
          View Details
        </Button>
      ]}
    >
      <Meta
        title={
          <div className="text-lg font-semibold text-gray-800 mb-2">
            {event.name}
          </div>
        }
        description={
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <CalendarOutlined className="mr-2" />
              <Text>{formatDate(event.date)}</Text>
            </div>
            <div className="flex items-center text-gray-600">
              <EnvironmentOutlined className="mr-2" />
              <Text>{event.location}</Text>
            </div>
            <div className="mt-3">
              <Text className="text-2xl font-bold text-blue-600">
                ${event.price}
              </Text>
              <Text className="text-gray-500 ml-1">per ticket</Text>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default EventCard;