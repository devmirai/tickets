import { User, LoginCredentials, RegisterData, UserTicket, PaymentMethod, EventPurchaser } from '../types/auth';

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
  createdAt: string;
  updatedAt: string;
  ticketTypes: any[];
}

// Interfaz para la respuesta de la API
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
  duration: '2 horas', // Valor por defecto ya que no viene en la API
  ticketTypes: apiEvent.ticketTypes,
  createdAt: apiEvent.createdAt,
  updatedAt: apiEvent.updatedAt
});

export const authService = {
  // Get QR for a ticket
  async getTicketQr(ticketId: string): Promise<{ qrCode: string; qrText: string; ticketInfo: any } | null> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return null;
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/tickets/${ticketId}/qr`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok && result.success && result.data) {
        return result.data;
      }
    } catch (error) {
      console.error('Error fetching ticket QR:', error);
    }
    return null;
  },

  // Login function
  async login(credentials: LoginCredentials): Promise<User | null> {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const result = await response.json();
      
      if (response.ok && result.user && result.token) {
        localStorage.setItem('tickethub_user', JSON.stringify(result.user));
        localStorage.setItem('tickethub_token', result.token);
        localStorage.setItem('tickethub_refresh_token', result.refreshToken || '');
        return result.user;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
    return null;
  },

  // Register function
  async register(data: RegisterData): Promise<User | null> {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      
      if (response.ok && result.success && result.data) {
        localStorage.setItem('tickethub_user', JSON.stringify(result.data.user));
        localStorage.setItem('tickethub_token', result.data.token);
        return result.data.user;
      }
      
      if (result.error) {
        throw new Error(result.error.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
    return null;
  },

  // Get current user from localStorage (para verificación inicial)
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('tickethub_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get current user from API
  async getCurrentUserFromApi(): Promise<User | null> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return null;
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/auth/me', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      
      if (response.ok && result.success && result.data) {
        localStorage.setItem('tickethub_user', JSON.stringify(result.data));
        return result.data;
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
    return null;
  },

  // Logout
  logout(): void {
    localStorage.removeItem('tickethub_user');
    localStorage.removeItem('tickethub_token');
    localStorage.removeItem('tickethub_refresh_token');
  },

  // Get user tickets (for customers)
  async getUserTickets(): Promise<UserTicket[]> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return [];
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/tickets', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      
      if (response.ok && result.success && Array.isArray(result.data)) {
        return result.data;
      }
    } catch (error) {
      console.error('Error fetching user tickets:', error);
    }
    return [];
  },

  // Get user payment methods (for customers)
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return [];
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/payment-methods', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      
      if (response.ok && result.success && Array.isArray(result.data)) {
        return result.data;
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
    return [];
  },

  // Get event purchasers (for companies)
  async getEventPurchasers(eventId: string): Promise<EventPurchaser[]> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return [];
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}/purchasers`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      
      if (response.ok && result.success && Array.isArray(result.data)) {
        return result.data;
      }
    } catch (error) {
      console.error('Error fetching event purchasers:', error);
    }
    return [];
  },

  // Add payment method
  async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod | null> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return null;
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/users/payment-methods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(paymentMethod)
      });
      const result = await response.json();
      
      if (response.ok && result.success && result.data) {
        return result.data;
      }
    } catch (error) {
      console.error('Error adding payment method:', error);
    }
    return null;
  },

  // Delete payment method
  async deletePaymentMethod(methodId: string): Promise<boolean> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return false;
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/payment-methods/${methodId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      return response.ok && result.success === true;
    } catch (error) {
      console.error('Error deleting payment method:', error);
      return false;
    }
  },

  // List all available events - ACTUALIZADO para usar la nueva estructura
  async listEvents(): Promise<any[]> {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/events', {
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
        // Transformar cada evento de la API al formato esperado por el frontend
        return result.events.map(transformApiEvent);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  // Get single event by ID
  async getEventById(id: string): Promise<any | null> {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/events/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result && result.events && Array.isArray(result.events) && result.events.length > 0) {
        return transformApiEvent(result.events[0]);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching event by ID:', error);
      return null;
    }
  }
};