// src/index.js
require('dotenv').config(); // load .env early
const express = require('express');
const app = express();
const pool = require('./db'); // pool so we can gracefully close it later
const moviesRouter = require('./routes/movies');

// JSON body parser middleware
app.use(express.json());

// Health check
app.get('/', (req, res) => res.send('Movie Library API is running'));

// Mount the movies routes at /movies
app.use('/movies', moviesRouter);

// Error handling middleware (fallback)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Graceful shutdown: close DB pool on SIGINT
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await pool.end(); // close postgres connections
  server.close(() => process.exit(0));
});
