import { clientMockEvents } from '../data/mockEvents';

// API client connecting React frontend to Express + MongoDB backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = {
  // Check backend server & database status
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Backend API health check failed:', err.message);
      return { status: 'offline', database: { connected: false, statusText: 'Offline / Unreachable' } };
    }
  },

  // Fetch single event by slug or ID
  async getEventBySlugOrId(slugOrId) {
    try {
      // Try slug endpoint first
      const res = await fetch(`${API_BASE_URL}/events/slug/${encodeURIComponent(slugOrId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.data) return data;
      }
    } catch { /* ignore, fall through to ID lookup */ }
    try {
      // Fall back to ID lookup
      const res = await fetch(`${API_BASE_URL}/events/${encodeURIComponent(slugOrId)}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.data) return data;
      }
    } catch (err) {
      console.warn('Failed to fetch event from backend:', err.message);
    }
    // Fall back to client mock data
    const found = clientMockEvents.find(e => e.slug === slugOrId || e._id === slugOrId);
    if (found) return { success: true, data: found, source: 'client_fallback' };
    return { success: false, data: null };
  },

  // Fetch events list
  async getEvents(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/events${query ? `?${query}` : ''}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.data?.length) return data;
      }
    } catch (err) {
      console.warn('Failed to fetch events from backend:', err.message);
    }
    // Client mock fallback
    let filtered = [...clientMockEvents];
    if (params.category && params.category !== 'All') {
      filtered = filtered.filter(e => e.category === params.category);
    }
    if (params.status && params.status !== 'All') {
      filtered = filtered.filter(e => e.status === params.status);
    }
    return { success: true, count: filtered.length, data: filtered, source: 'client_fallback' };
  },

  // Fetch team members
  async getMembers() {
    try {
      const res = await fetch(`${API_BASE_URL}/members`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Failed to fetch members from backend:', err.message);
      return { success: false, data: [] };
    }
  },

  // Submit contact/inquiry/join form
  async submitInquiry(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || `HTTP ${res.status}`);
      }
      return data;
    } catch (err) {
      console.error('Failed to submit inquiry:', err.message);
      throw err;
    }
  },
};
