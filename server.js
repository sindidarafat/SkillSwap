// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');           // ← import cors

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes  = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Initialize Express app
const app = express();

// Enable CORS (you can also pass options to restrict origins)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB without deprecated options
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use the authentication routes under /api/auth
app.use('/api/auth', authRoutes);
// Mount the skills routes under /api/skills
app.use('/api/skills', skillRoutes);
// Mount reviewRoutes under /api/skills/:skillId/reviews
app.use('/api/skills/:skillId/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
