import { Inquiry } from '../models/Inquiry.js';
import mongoose from 'mongoose';

// In-memory array for inquiries if DB is not connected yet
const inMemoryInquiries = [];

export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, studentId, year, domainInterest, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.',
      });
    }

    const isDbConnected = mongoose.connection.readyState === 1;

    if (isDbConnected) {
      const inquiry = new Inquiry({
        name,
        email,
        phone,
        studentId,
        year,
        domainInterest,
        message,
      });
      const saved = await inquiry.save();
      return res.status(201).json({
        success: true,
        message: 'Your inquiry has been successfully recorded in the database! The AlgoZenith SRMCEM team will reach out soon.',
        data: saved,
      });
    } else {
      const offlineRecord = {
        _id: 'inquiry-' + Date.now(),
        name,
        email,
        phone,
        studentId,
        year,
        domainInterest,
        message,
        createdAt: new Date(),
        status: 'pending (stored in-memory: connect MongoDB to persist permanently)',
      };
      inMemoryInquiries.push(offlineRecord);
      return res.status(201).json({
        success: true,
        message: 'Inquiry received! Note: MongoDB is currently offline, so response was logged in server memory.',
        data: offlineRecord,
      });
    }
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit inquiry',
      error: error.message,
    });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      const inquiries = await Inquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: inquiries.length, data: inquiries });
    }
    return res.json({ success: true, count: inMemoryInquiries.length, data: inMemoryInquiries });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
