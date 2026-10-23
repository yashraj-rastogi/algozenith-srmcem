import { Event } from '../models/Event.js';
import { mockEvents } from '../data/mockData.js';
import mongoose from 'mongoose';

export const getEvents = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      const { category, status } = req.query;
      const query = {};
      if (category && category !== 'All') query.category = category;
      if (status && status !== 'All') query.status = status;

      const events = await Event.find(query).sort({ date: 1 });
      if (events.length > 0) {
        return res.json({ success: true, count: events.length, data: events, source: 'database' });
      }
    }
    // Fallback to initial mock events
    let filtered = [...mockEvents];
    if (req.query.category && req.query.category !== 'All') {
      filtered = filtered.filter(e => e.category === req.query.category);
    }
    if (req.query.status && req.query.status !== 'All') {
      filtered = filtered.filter(e => e.status === req.query.status);
    }
    return res.json({ success: true, count: filtered.length, data: filtered, source: 'fallback_mock' });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching events', error: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      const event = await Event.findById(req.params.id);
      if (event) return res.json({ success: true, data: event });
    }
    const mock = mockEvents.find(e => e._id === req.params.id);
    if (mock) return res.json({ success: true, data: mock });
    return res.status(404).json({ success: false, message: 'Event not found' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      const event = await Event.findOne({ slug });
      if (event) return res.json({ success: true, data: event });
    }
    const mock = mockEvents.find(e => e.slug === slug);
    if (mock) return res.json({ success: true, data: mock });
    return res.status(404).json({ success: false, message: `Event with slug '${slug}' not found` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const createEvent = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      return res.status(503).json({
        success: false,
        message: 'MongoDB is currently disconnected. Please connect MongoDB to persist new events.'
      });
    }
    const newEvent = new Event(req.body);
    const saved = await newEvent.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
