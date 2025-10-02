// src/db.js
// Load env vars so process.env.DATABASE_URL is available
require('dotenv').config();

const { Pool } = require('pg');

// Create a connection pool using DATABASE_URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
  // You could add ssl options for production here if needed
});

// Export the pool for other modules to query the DB
module.exports = pool;
