import express from 'express';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const dbStatus = getDBStatus();
  return res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'AlgoZenith SRMCEM API',
    version: '1.0.0',
    database: {
      connected: dbStatus.connected,
      status: dbStatus.statusText,
    },
    system: {
      uptime: process.uptime(),
      nodeVersion: process.version,
    },
  });
});

export default router;
