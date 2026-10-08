import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    subRole: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    department: {
      type: String,
      default: 'CSE / IT',
    },
    year: {
      type: String,
      default: '3rd Year',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    socials: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      codeforces: { type: String, default: '' },
      leetcode: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
    order: {
      type: Number,
      default: 10,
    },
    isCoreTeam: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Member = mongoose.model('Member', memberSchema);
