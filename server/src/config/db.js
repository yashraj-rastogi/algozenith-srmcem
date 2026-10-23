import mongoose from 'mongoose';

let cachedConnection = null;

export const connectDB = async () => {
  // If connection is already open or connecting, reuse it (crucial for serverless environments like Vercel)
  if (mongoose.connection.readyState === 1) {
    return true;
  }

  if (cachedConnection) {
    return true;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/algozenith_srmcem';

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    cachedConnection = conn;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    cachedConnection = null;
    console.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.warn('ℹ️ Running with fallback sample data. Set MONGODB_URI to your MongoDB Atlas connection string for cloud persistence.');
    return false;
  }
};

export const getDBStatus = () => {
  const state = mongoose.connection.readyState;
  const states = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting',
  };
  return {
    connected: state === 1,
    statusText: states[state] || 'Unknown',
  };
};
