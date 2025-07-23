import axios from 'axios';
import eventsData from '../mocks/events.json';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const eventService = {
  // Get all events
  async getAllEvents() {
    await delay(500); // Simulate network delay
    return {
      data: eventsData,
      status: 200
    };
  },

  // Get event by ID
  async getEventById(id) {
    await delay(300);
    const event = eventsData.find(event => event.id === parseInt(id));
    if (event) {
      return {
        data: event,
        status: 200
      };
    }
    throw new Error('Event not found');
  },

  // Search events by category or name
  async searchEvents(query) {
    await delay(400);
    const filteredEvents = eventsData.filter(event => 
      event.name.toLowerCase().includes(query.toLowerCase()) ||
      event.category.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase())
    );
    return {
      data: filteredEvents,
      status: 200
    };
  }
};