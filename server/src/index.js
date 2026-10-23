import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database on boot (in standard Node environment)
connectDB();

// Ensure DB connection for serverless invocations (e.g. Vercel)
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.warn('Middleware DB connection check warning:', err.message);
  }
  next();
});

// Dynamic CORS configuration (supports localhost, custom domains, and Vercel deployments)
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      origin.endsWith('.vercel.app') ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(morgan('dev'));

// API Routes
app.use('/api/health', healthRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to AlgoZenith SRMCEM API Portal 🚀',
    docs: '/api/health',
    endpoints: {
      health: '/api/health',
      events: '/api/events',
      members: '/api/members',
      inquiries: '/api/inquiries',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start HTTP server only when not running as a Vercel Serverless Function
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`\n=================================================`);
    console.log(`⚡ AlgoZenith SRMCEM Server running on port ${PORT}`);
    console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`=================================================\n`);
  });
}

export default app;
