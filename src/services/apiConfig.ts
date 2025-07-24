export const API_BASE_URL = 'http://localhost:5000/api';

export const API_ROUTES = {
  events: `${API_BASE_URL}/events`,
  eventDetail: (id: string | number) => `${API_BASE_URL}/events/${id}`,
  paymentMethods: `${API_BASE_URL}/payment-methods`,
  orders: `${API_BASE_URL}/users/orders`, // <--- Nueva ruta para órdenes
  // agrega aquí otras rutas si las necesitas
};