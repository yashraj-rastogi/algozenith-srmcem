// API client connecting React frontend to Express + MongoDB backend
const API_BASE_URL = '/api';

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

  // Fetch events list
  async getEvents(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/events${query ? `?${query}` : ''}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn('Failed to fetch events from backend:', err.message);
      return { success: false, data: [] };
    }
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
