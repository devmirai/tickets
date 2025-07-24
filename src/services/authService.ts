import { User, LoginCredentials, RegisterData, UserTicket, PaymentMethod, EventPurchaser } from '../types/auth';


export const authService = {
  // Get QR for a ticket
  async getTicketQr(ticketId: string): Promise<{ qrCode: string; qrText: string; ticketInfo: any } | null> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return null;
    const response = await fetch(`http://127.0.0.1:5000/api/tickets/${ticketId}/qr`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    if (response.ok && result.success && result.data) {
      return result.data;
    }
    return null;
  },
  // Login function
  async login(credentials: LoginCredentials): Promise<User | null> {
    const response = await fetch('http://127.0.0.1:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    const result = await response.json();
    if (response.ok && result.success && result.data) {
      localStorage.setItem('tickethub_user', JSON.stringify(result.data.user));
      localStorage.setItem('tickethub_token', result.data.token);
      return result.data.user;
    }
    return null;
  },

  // Register function
  async register(data: RegisterData): Promise<User | null> {
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
    return null;
  },

  // Get current user from API
  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return null;
    const response = await fetch('http://127.0.0.1:5000/api/auth/me', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    if (response.ok && result.success && result.data) {
      localStorage.setItem('tickethub_user', JSON.stringify(result.data));
      return result.data;
    }
    return null;
  },

  // Logout
  logout(): void {
    localStorage.removeItem('tickethub_user');
    localStorage.removeItem('tickethub_token');
  },

  // Get user tickets (for customers)
  async getUserTickets(): Promise<UserTicket[]> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return [];
    const response = await fetch('http://127.0.0.1:5000/api/users/tickets', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    if (response.ok && result.success && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  },

  // Get user payment methods (for customers)
  async getPaymentMethods(): Promise<PaymentMethod[]> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return [];
    const response = await fetch('http://127.0.0.1:5000/api/users/payment-methods', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    if (response.ok && result.success && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  },

  // Get event purchasers (for companies)
  async getEventPurchasers(eventId: string): Promise<EventPurchaser[]> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return [];
    const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}/purchasers`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    if (response.ok && result.success && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  },

  // Add payment method
  async addPaymentMethod(paymentMethod: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod | null> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return null;
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
    return null;
  },

  // Delete payment method
  async deletePaymentMethod(methodId: string): Promise<boolean> {
    const token = localStorage.getItem('tickethub_token');
    if (!token) return false;
    const response = await fetch(`http://127.0.0.1:5000/api/users/payment-methods/${methodId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();
    return response.ok && result.success === true;
  }
};
