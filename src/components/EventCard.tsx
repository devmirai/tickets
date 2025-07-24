import React from 'react';
import { Card, Button, Tag, Typography } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;
const { Text } = Typography;

interface EventCardProps {
  event: {
    id: string;
    name: string;
    title: string;
    price: number;
    basePrice: number;
    date: string;
    eventDate: string;
    location: string;
    venue: string;
    city: string;
    image: string;
    imageUrl: string;
    category: string;
    description?: string;
    availableTickets?: number;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
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

  // Usar las propiedades correctas con fallbacks
  const eventName = event.name || event.title;
  const eventPrice = event.price || event.basePrice;
  const eventDate = event.date || event.eventDate;
  const eventLocation = event.location || `${event.venue}, ${event.city}`;
  const eventImage = event.image || event.imageUrl;

  // Imagen por defecto si no hay imagen
  const imageUrl = eventImage || 'https://via.placeholder.com/300x200?text=Evento';

  return (
    <Card
      hoverable
      className="h-full shadow-md hover:shadow-lg transition-shadow duration-300"
      cover={
        <div className="relative overflow-hidden h-48">
          <img
            alt={eventName}
            src={imageUrl}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              // Imagen de fallback si la imagen falla al cargar
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x200?text=Evento';
            }}
          />
          <Tag
            color={getCategoryColor(event.category)}
            className="absolute top-3 right-3"
          >
            {event.category}
          </Tag>
          
          {/* Mostrar tickets disponibles si existe la información */}
          {event.availableTickets !== undefined && (
            <Tag
              color={event.availableTickets > 100 ? 'green' : event.availableTickets > 10 ? 'orange' : 'red'}
              className="absolute top-3 left-3"
            >
              {event.availableTickets} disponibles
            </Tag>
          )}
        </div>
      }
      actions={[
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/event/${event.id}`)}
          className="w-full mx-4"
          key="view-details"
        >
          Ver Detalles
        </Button>
      ]}
    >
      <Meta
        title={
          <div className="text-lg font-semibold text-gray-800 mb-2">
            {eventName}
          </div>
        }
        description={
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <CalendarOutlined className="mr-2" />
              <Text>{formatDate(eventDate)}</Text>
            </div>
            <div className="flex items-center text-gray-600">
              <EnvironmentOutlined className="mr-2" />
              <Text className="truncate">{eventLocation}</Text>
            </div>
            
            {/* Mostrar descripción si existe */}
            {event.description && (
              <div className="mt-2">
                <Text className="text-gray-500 text-sm line-clamp-2">
                  {event.description.length > 100 
                    ? `${event.description.substring(0, 100)}...` 
                    : event.description
                  }
                </Text>
              </div>
            )}
            
            <div className="mt-3">
              <Text className="text-2xl font-bold text-blue-600">
                ${eventPrice?.toLocaleString()}
              </Text>
              <Text className="text-gray-500 ml-1">por boleto</Text>
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default EventCard;