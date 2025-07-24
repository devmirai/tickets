// src/services/authService.ts
import { User, LoginCredentials, RegisterData, UserTicket, PaymentMethod, EventPurchaser } from '../types/auth';

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

// Mock data para desarrollo cuando no hay backend disponible
const mockTickets: UserTicket[] = [
  {
    id: '1',
    orderId: 'ORD-001',
    eventName: 'Concierto de Rock 2025',
    eventDate: '2025-08-12T20:00:00',
    eventLocation: 'Estadio Nacional, Lima',
    quantity: 2,
    totalPrice: 300,
    purchaseDate: '2025-01-15T10:30:00',
    status: 'valid',
    ticketNumber: 'TCK-001-2025'
  },
  {
    id: '2',
    orderId: 'ORD-002',
    eventName: 'Festival de Jazz',
    eventDate: '2025-09-05T19:00:00',
    eventLocation: 'Auditorio de la Ciudad, Lima',
    quantity: 1,
    totalPrice: 90,
    purchaseDate: '2025-01-10T14:15:00',
    status: 'valid',
    ticketNumber: 'TCK-002-2025'
  }
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit-card',
    lastFour: '4567',
    cardType: 'Visa',
    isDefault: true,
    expiryDate: '12/27'
  },
  {
    id: '2',
    type: 'paypal',
    isDefault: false
  }
];

const mockEventPurchasers: EventPurchaser[] = [
  {
    id: '1',
    customerName: 'María González',
    email: 'maria@example.com',
    phone: '+51 987 654 321',
    quantity: 2,
    totalPaid: 300,
    purchaseDate: '2025-01-15T10:30:00',
    orderId: 'ORD-001'
  },
  {
    id: '2',
    customerName: 'Carlos Rodríguez',
    email: 'carlos@example.com',
    phone: '+51 987 654 322',
    quantity: 1,
    totalPaid: 150,
    purchaseDate: '2025-01-14T16:45:00',
    orderId: 'ORD-003'
  }
];

export const authService = {
  // Get QR for a ticket
  async getTicketQr(ticketId: string): Promise<{ qrCode: string; qrText: string; ticketInfo: any } | null> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return null;
    
    try {
      const response = await fetch(`http://localhost:5000/api/tickets/${ticketId}/qr`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (response.ok && result.success && result.data) {
        return result.data;
      }
    } catch (error) {
      console.error('Error fetching ticket QR:', error);
      // Fallback para desarrollo
      return {
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticketId}`,
        qrText: ticketId,
        ticketInfo: { ticketId, valid: true }
      };
    }
    return null;
  },

  // Login function
  async login(credentials: LoginCredentials): Promise<User | null> {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
      // Mock login para desarrollo
      if (credentials.email === 'user@tickethub.com' && credentials.password === 'password123') {
        const mockUser: User = {
          id: '1',
          email: 'user@tickethub.com',
          firstName: 'Usuario',
          lastName: 'Demo',
          phone: '+51 987 654 321',
          userType: 'customer',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('tickethub_user', JSON.stringify(mockUser));
        localStorage.setItem('tickethub_token', 'mock-token');
        return mockUser;
      } else if (credentials.email === 'empresa@tickethub.com' && credentials.password === 'password123') {
        const mockCompany: User = {
          id: '2',
          email: 'empresa@tickethub.com',
          firstName: 'Empresa',
          lastName: 'Demo',
          phone: '+51 987 654 322',
          userType: 'company',
          companyName: 'EventCorp SA',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('tickethub_user', JSON.stringify(mockCompany));
        localStorage.setItem('tickethub_token', 'mock-token-company');
        return mockCompany;
      }
    }
    return null;
  },

  // Register function
  async register(data: RegisterData): Promise<User | null> {
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
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
      // Mock registration para desarrollo
      const mockUser: User = {
        id: Math.random().toString(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        userType: data.userType,
        companyName: data.companyName,
        createdAt: new Date().toISOString()
      };
      localStorage.setItem('tickethub_user', JSON.stringify(mockUser));
      localStorage.setItem('tickethub_token', 'mock-token-new');
      return mockUser;
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
      const response = await fetch('http://localhost:5000/api/auth/me', {
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
      // Devolver usuario de localStorage si el backend no está disponible
      return this.getCurrentUser();
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
      const response = await fetch('http://localhost:5000/api/users/tickets', {
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
    
    // Devolver datos mock para desarrollo
    return mockTickets;
  },

  // Get user payment methods (for customers)
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return [];
    
    try {
      const response = await fetch('http://localhost:5000/api/users/payment-methods', {
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
    
    // Devolver datos mock para desarrollo
    return mockPaymentMethods;
  },

  // Get event purchasers (for companies)
  async getEventPurchasers(eventId: string): Promise<EventPurchaser[]> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return [];
    
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}/purchasers`, {
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
    
    // Devolver datos mock para desarrollo
    return mockEventPurchasers;
  },

  // Add payment method
  async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod | null> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return null;
    
    try {
      const response = await fetch('http://localhost:5000/api/users/payment-methods', {
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
      const response = await fetch(`http://localhost:5000/api/users/payment-methods/${methodId}`, {
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
        // Transformar cada evento de la API al formato esperado por el frontend
        return result.events.map(transformApiEvent);
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  // Get single event by ID - ACTUALIZADO para usar la nueva estructura
  async getEventById(id: string): Promise<any | null> {
    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // La nueva API devuelve { event: { ... } } para eventos individuales
      const result: ApiEventResponse = await response.json();
      
      if (result && result.event) {
        return transformApiEvent(result.event);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching event by ID:', error);
      return null;
    }
  }
};