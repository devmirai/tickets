export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: 'customer' | 'company';
  companyName?: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  userType: 'customer' | 'company';
  companyName?: string;
}

export interface UserTicket {
  id: string;
  orderId: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  quantity: number;
  totalPrice: number;
  purchaseDate: string;
  status: 'valid' | 'used' | 'cancelled';
  ticketNumber: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit-card' | 'paypal' | 'apple-pay';
  lastFour?: string;
  cardType?: string;
  isDefault: boolean;
  expiryDate?: string;
}

export interface EventPurchaser {
  id: string;
  customerName: string;
  email: string;
  phone?: string;
  quantity: number;
  totalPaid: number;
  purchaseDate: string;
  orderId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
