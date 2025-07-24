export const eventService = {
  // Get all events
  async getAllEvents() {
    const token = localStorage.getItem('tickethub_token');
    const response = await fetch('http://127.0.0.1:5000/api/events', {
      method: 'GET',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    const result = await response.json();
    return {
      data: result.data || [],
      status: response.status
    };
  },

  // Get event by ID
  async getEventById(id) {
    const token = localStorage.getItem('tickethub_token');
    const response = await fetch(`http://127.0.0.1:5000/api/events/${id}`, {
      method: 'GET',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    const result = await response.json();
    return {
      data: result.data || null,
      status: response.status
    };
  },

  // Search events by category or name
  async searchEvents(query) {
    const token = localStorage.getItem('tickethub_token');
    const response = await fetch(`http://127.0.0.1:5000/api/events?search=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    const result = await response.json();
    return {
      data: result.data || [],
      status: response.status
    };
  }
};