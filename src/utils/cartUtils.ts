// Types for cart functionality
export interface Event {
  id: string;
  name: string;
  price: number;
  date: string;
  location: string;
  image: string;
  category: string;
  description?: string;
  duration?: string;
}

export interface CartItem extends Event {
  quantity: number;
  totalPrice: number;
}

export const cartUtils = {
  // Get cart from localStorage
  getCart(): CartItem[] {
    const cart = localStorage.getItem('ticketCart');
    return cart ? JSON.parse(cart) : [];
  },

  // Save cart to localStorage
  saveCart(cart: CartItem[]): void {
    localStorage.setItem('ticketCart', JSON.stringify(cart));
  },

  // Add item to cart
  addToCart(event: Event, quantity: number = 1): CartItem[] {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === event.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.price * existingItem.quantity;
    } else {
      cart.push({
        ...event,
        quantity,
        totalPrice: event.price * quantity
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
    localStorage.removeItem('ticketCart');
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
  }
};
