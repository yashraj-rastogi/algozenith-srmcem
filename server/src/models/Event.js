import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
    },
    category: {
      type: String,
      enum: ['Contest', 'Workshop', 'Hackathon', 'Webinar', 'Bootcamp', 'Meetup'],
      default: 'Workshop',
    },
    date: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    time: {
      type: String,
      default: '5:00 PM - 7:00 PM IST',
    },
    venue: {
      type: String,
      default: 'CS Lab 3 / Online via Discord',
    },
    registrationUrl: {
      type: String,
      default: '#',
    },
    coverImage: {
      type: String,
      default: '',
    },
    tags: [{
      type: String,
      trim: true,
    }],
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed'],
      default: 'upcoming',
    },
    speakers: [{
      name: String,
      title: String,
      avatar: String,
    }],
  },
  { timestamps: true }
);

export const Event = mongoose.model('Event', eventSchema);
