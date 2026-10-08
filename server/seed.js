import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Event } from './src/models/Event.js';
import { Member } from './src/models/Member.js';
import { mockEvents, mockMembers } from './src/data/mockData.js';

dotenv.config();

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/algozenith_srmcem';
  console.log(`Connecting to MongoDB at: ${uri}`);

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected for seeding.');

    console.log('Clearing existing events & members...');
    await Event.deleteMany({});
    await Member.deleteMany({});

    // Clean mock events for insertion (remove string _id to let Mongo generate ObjectId)
    const eventsToInsert = mockEvents.map(({ _id, ...rest }) => rest);
    const membersToInsert = mockMembers.map(({ _id, ...rest }) => rest);

    console.log('Inserting events...');
    const insertedEvents = await Event.insertMany(eventsToInsert);
    console.log(`✅ Inserted ${insertedEvents.length} events.`);

    console.log('Inserting members...');
    const insertedMembers = await Member.insertMany(membersToInsert);
    console.log(`✅ Inserted ${insertedMembers.length} members.`);

    console.log('🎉 Seeding successfully completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
