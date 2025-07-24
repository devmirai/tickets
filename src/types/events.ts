// src/types/events.ts

export interface Event {
  id: number;
  title: string;
  description: string;
  eventDate: string; // ISO 8601 (ej: 2025-09-15T20:00:00)
  venue: string;
  address: string;
  city: string;
  country: string;
  category: string;
  totalTickets: number;
  availableTickets: number;
  basePrice: number;
  imageUrl: string;
  companyId: number;
  isActive: boolean;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}

export interface Pagination {
  hasNext: boolean;
  hasPrev: boolean;
  page: number;
  pages: number;
  perPage: number;
  total: number;
}

export interface EventListResponse {
  data: Event[];
  pagination: Pagination;
}
