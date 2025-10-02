-- migrations/init.sql
CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  director VARCHAR(255),
  release_year INTEGER,
  genre VARCHAR(100),
  rating NUMERIC(3,1), -- e.g. 8.7
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
