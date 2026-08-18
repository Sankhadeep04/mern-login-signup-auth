import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Database
connectDB();

// Core Middlewares
app.use(cors({
  origin: '*', // Allow frontend dev server requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

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

// Start Express Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  🚀 Backend API Server running on port ${PORT}`);
  console.log(`  🔗 Endpoint: http://localhost:${PORT}/api/auth`);
  console.log(`====================================================`);
});
