const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');


// Core middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'ai-notes-backend' });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});




module.exports = app;
