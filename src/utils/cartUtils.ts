// Types for cart functionality
export interface Event {
  id: string;
  name?: string;
  title?: string;
  price?: number;
  basePrice?: number;
  date?: string;
  eventDate?: string;
  location?: string;
  venue?: string;
  city?: string;
  image?: string;
  imageUrl?: string;
  category: string;
  description?: string;
  duration?: string;
  availableTickets?: number;
}

export interface CartItem {
  id: string;
  name: string;
  title: string;
  price: number;
  date: string;
  location: string;
  image: string;
  category: string;
  description?: string;
  duration?: string;
  quantity: number;
  totalPrice: number;
  availableTickets?: number;
}

// Función para normalizar un evento para el carrito
const normalizeEventForCart = (event: Event): Omit<CartItem, 'quantity' | 'totalPrice'> => {
  const eventName = event.name || event.title || 'Evento sin nombre';
  const eventPrice = event.price || event.basePrice || 0;
  const eventDate = event.date || event.eventDate || '';
  const eventLocation = event.location || (event.venue && event.city ? `${event.venue}, ${event.city}` : 'Ubicación no especificada');
  const eventImage = event.image || event.imageUrl || 'https://img.freepik.com/foto-gratis/gente-festival_1160-736.jpg?semt=ais_hybrid&w=740';

  return {
    id: event.id,
    name: eventName,
    title: eventName,
    price: eventPrice,
    date: eventDate,
    location: eventLocation,
    image: eventImage,
    category: event.category,
    description: event.description,
    duration: event.duration,
    availableTickets: event.availableTickets
  };
};

export const cartUtils = {
  // Get cart from localStorage
  getCart(): CartItem[] {
    try {
      const cart = localStorage.getItem('ticketCart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  },

  // Save cart to localStorage
  saveCart(cart: CartItem[]): void {
    try {
      localStorage.setItem('ticketCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  },

  // Add item to cart
  addToCart(event: Event, quantity: number = 1): CartItem[] {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === event.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
      const normalizedEvent = normalizeEventForCart(event);
      cart.push({
        ...normalizedEvent,
        quantity,
        totalPrice: normalizedEvent.price * quantity
      });
    }
    
    this.saveCart(cart);
    return cart;
  },

  // Remove item from cart
  removeFromCart(eventId: string): CartItem[] {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== eventId);
    this.saveCart(cart);
    return cart;
  },

  // Update item quantity
  updateQuantity(eventId: string, quantity: number): CartItem[] {
    const cart = this.getCart();
    const item = cart.find(item => item.id === eventId);
    
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(eventId);
      }
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;
      this.saveCart(cart);
    }
    
    return cart;
  },

  // Clear cart
  clearCart(): CartItem[] {
    try {
      localStorage.removeItem('ticketCart');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
    return [];
  },

  // Get total cart amount
  getCartTotal(): number {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  },

  // Get total items count
  getCartItemsCount(): number {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },

  // Check if event is in cart
  isInCart(eventId: string): boolean {
    const cart = this.getCart();
    return cart.some(item => item.id === eventId);
  },

  // Get item from cart
  getCartItem(eventId: string): CartItem | undefined {
    const cart = this.getCart();
    return cart.find(item => item.id === eventId);
  }
};