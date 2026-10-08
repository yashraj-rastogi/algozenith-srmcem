import { Member } from '../models/Member.js';
import { mockMembers } from '../data/mockData.js';
import mongoose from 'mongoose';

export const getMembers = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (isDbConnected) {
      const members = await Member.find().sort({ order: 1, createdAt: 1 });
      if (members.length > 0) {
        return res.json({ success: true, count: members.length, data: members, source: 'database' });
      }
    }
    return res.json({ success: true, count: mockMembers.length, data: mockMembers, source: 'fallback_mock' });
  } catch (error) {
    console.error('Error fetching members:', error);
    return res.status(500).json({ success: false, message: 'Server error fetching members', error: error.message });
  }
};

export const createMember = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      return res.status(503).json({
        success: false,
        message: 'MongoDB is currently disconnected. Please connect MongoDB to add members.'
      });
    }
    const member = new Member(req.body);
    const saved = await member.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
