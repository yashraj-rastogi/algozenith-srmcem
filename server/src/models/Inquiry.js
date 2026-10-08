import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Your name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    studentId: {
      type: String,
      default: '',
      trim: true,
    },
    year: {
      type: String,
      default: '1st Year',
    },
    domainInterest: {
      type: String,
      enum: [
        'Competitive Programming (DSA)',
        'Full Stack Web Development',
        'Machine Learning & AI',
        'Open Source & Git',
        'Club Membership / Core Team',
        'Other Query',
      ],
      default: 'Competitive Programming (DSA)',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'contacted'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
