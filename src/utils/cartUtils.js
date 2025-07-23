export const cartUtils = {
  // Get cart from localStorage
  getCart() {
    const cart = localStorage.getItem('ticketCart');
    return cart ? JSON.parse(cart) : [];
  },

  // Save cart to localStorage
  saveCart(cart) {
    localStorage.setItem('ticketCart', JSON.stringify(cart));
  },

  // Add item to cart
  addToCart(event, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === event.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
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
  removeFromCart(eventId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== eventId);
    this.saveCart(cart);
    return cart;
  },

  // Update item quantity
  updateQuantity(eventId, quantity) {
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
  clearCart() {
    localStorage.removeItem('ticketCart');
    return [];
  },

  // Get total cart amount
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  },

  // Get total items count
  getCartItemsCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
};