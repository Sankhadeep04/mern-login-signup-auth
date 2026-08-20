import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Core Middlewares
app.use(cors({
  origin: '*', // Allow frontend dev server and Vercel requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Middleware to ensure Database Connection on every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('[Database Middleware Error]:', error.message);
    res.status(500).json({
      success: false,
      message: 'Database connection failed. Please check your MONGO_URI in Vercel Environment Variables.'
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    message: 'MERN Authentication API Server is running smoothly'
  });
});

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Start Express Server locally
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  🚀 Backend API Server running on port ${PORT}`);
    console.log(`  🔗 Endpoint: http://localhost:${PORT}/api/auth`);
    console.log(`====================================================`);
  });
}

export default app;
