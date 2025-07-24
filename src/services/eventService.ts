// src/services/eventService.ts

// Interfaz para la información de la empresa
interface ApiCompany {
  id: number;
  name: string;
  email: string;
}

// Interfaz para el evento que viene del backend
interface ApiEvent {
  id: number;
  title: string;
  description: string;
  eventDate: string;
  venue: string;
  address: string;
  city: string;
  country: string;
  category: string;
  basePrice: number;
  availableTickets: number;
  totalTickets: number;
  imageUrl: string;
  isActive: boolean;
  companyId: number;
  company?: ApiCompany;
  createdAt: string;
  updatedAt: string;
  ticketTypes: any[];
}

// Interfaz para la respuesta de la API de evento individual
interface ApiEventResponse {
  event: ApiEvent;
}

// Interfaz para la respuesta de la API de múltiples eventos
interface ApiEventsResponse {
  events: ApiEvent[];
  pagination: {
    hasNext: boolean;
    hasPrev: boolean;
    page: number;
    pages: number;
    perPage: number;
    total: number;
  };
}

// Función para transformar evento de API a formato del frontend
const transformApiEvent = (apiEvent: ApiEvent) => ({
  id: apiEvent.id.toString(),
  name: apiEvent.title,
  title: apiEvent.title,
  description: apiEvent.description,
  date: apiEvent.eventDate,
  eventDate: apiEvent.eventDate,
  location: `${apiEvent.venue}, ${apiEvent.city}`,
  venue: apiEvent.venue,
  address: apiEvent.address,
  city: apiEvent.city,
  country: apiEvent.country,
  category: apiEvent.category,
  price: apiEvent.basePrice,
  basePrice: apiEvent.basePrice,
  availableTickets: apiEvent.availableTickets,
  totalTickets: apiEvent.totalTickets,
  image: apiEvent.imageUrl,
  imageUrl: apiEvent.imageUrl,
  isActive: apiEvent.isActive,
  companyId: apiEvent.companyId,
  company: apiEvent.company,
  duration: '2 horas', // Valor por defecto ya que no viene en la API
  ticketTypes: apiEvent.ticketTypes,
  createdAt: apiEvent.createdAt,
  updatedAt: apiEvent.updatedAt
});

export const eventService = {
  // Get all events
  async getAllEvents() {
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiEventsResponse = await response.json();
      
      if (result && result.events && Array.isArray(result.events)) {
        return {
          data: result.events.map(transformApiEvent),
          pagination: result.pagination,
          status: response.status
        };
      }
      
      return {
        data: [],
        pagination: null,
        status: response.status
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 500
      };
    }
  },

  // Get event by ID - ACTUALIZADO para manejar la nueva estructura
  async getEventById(id: string | number) {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return {
            data: null,
            error: 'Evento no encontrado',
            status: 404
          };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // La nueva API devuelve { event: { ... } } para eventos individuales
      const result: ApiEventResponse = await response.json();
      
      if (result && result.event) {
        return {
          data: transformApiEvent(result.event),
          status: response.status
        };
      }
      
      return {
        data: null,
        error: 'Evento no encontrado',
        status: 404
      };
    } catch (error) {
      console.error('Error fetching event by ID:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 500
      };
    }
  },

  // Search events by category or name
  async searchEvents(query: string) {
    try {
      const encodedQuery = encodeURIComponent(query);
      const response = await fetch(`http://localhost:5000/api/events?search=${encodedQuery}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiEventsResponse = await response.json();
      
      if (result && result.events && Array.isArray(result.events)) {
        return {
          data: result.events.map(transformApiEvent),
          pagination: result.pagination,
          status: response.status
        };
      }
      
      return {
        data: [],
        pagination: null,
        status: response.status
      };
    } catch (error) {
      console.error('Error searching events:', error);
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 500
      };
    }
  },

  // Get events by category
  async getEventsByCategory(category: string) {
    try {
      const encodedCategory = encodeURIComponent(category);
      const response = await fetch(`http://localhost:5000/api/events?category=${encodedCategory}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result: ApiEventsResponse = await response.json();
      
      if (result && result.events && Array.isArray(result.events)) {
        return {
          data: result.events.map(transformApiEvent),
          pagination: result.pagination,
          status: response.status
        };
      }
      
      return {
        data: [],
        pagination: null,
        status: response.status
      };
    } catch (error) {
      console.error('Error fetching events by category:', error);
      return {
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 500
      };
    }
  }
};