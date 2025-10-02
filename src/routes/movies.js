// src/routes/movies.js
const express = require('express');
const router = express.Router();
const pool = require('../db'); // our postgres pool

// --- LIST movies --------------------------------------------------
// GET /movies?limit=10&offset=0
router.get('/', async (req, res) => {
  try {
    // read optional paging params (strings from query)
    const limit = req.query.limit ? Number(req.query.limit) : null;
    const offset = req.query.offset ? Number(req.query.offset) : null;

    // build base SQL
    let sql = 'SELECT * FROM movies ORDER BY id DESC';
    const params = [];

    // add LIMIT / OFFSET safely using parameterized placeholders
    if (limit !== null) {
      params.push(limit);
      sql += ` LIMIT $${params.length}`; // $1, $2 etc.
    }
    if (offset !== null) {
      params.push(offset);
      sql += ` OFFSET $${params.length}`;
    }

    const { rows } = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching movies:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- GET single movie ---------------------------------------------
// GET /movies/:id
router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { rows } = await pool.query('SELECT * FROM movies WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching movie:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- CREATE new movie --------------------------------------------
// POST /movies
// --- CREATE new movie --------------------------------------------
// POST /movies
router.post('/', async (req, res) => {
  try {
    // extract fields from request body (client should send JSON)
    const { title, description, director, release_year, genre, rating } = req.body;

    // --- validation ---
    if (!title) return res.status(400).json({ error: 'title is required' });
    if (title.length > 255) return res.status(400).json({ error: 'title too long' });
    if (director && director.length > 255) return res.status(400).json({ error: 'director too long' });
    if (genre && genre.length > 100) return res.status(400).json({ error: 'genre too long' });

    // Ensure numeric values match column types
    const releaseYearNum = release_year ? Number(release_year) : null;
    const ratingNum = rating ? parseFloat(rating).toFixed(1) : null; // numeric(3,1)

    const insertSQL = `
      INSERT INTO movies (title, description, director, release_year, genre, rating)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [
      title,
      description || null,
      director || null,
      releaseYearNum,
      genre || null,
      ratingNum
    ];

    const { rows } = await pool.query(insertSQL, values);
    res.status(201).json(rows[0]); // return created movie
  } catch (err) {
    console.error('Error creating movie:', err.message, err.stack); // detailed logging
    res.status(500).json({ error: 'Internal server error' });
  }
});


// --- UPDATE (replace) a movie ------------------------------------
// PUT /movies/:id
// Expects a JSON body with (at least) title. This will replace the fields listed.
router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { title, description, director, release_year, genre, rating } = req.body;

    if (!title) return res.status(400).json({ error: 'title is required' });

    const updateSQL = `
      UPDATE movies
      SET title = $1,
          description = $2,
          director = $3,
          release_year = $4,
          genre = $5,
          rating = $6
      WHERE id = $7
      RETURNING *;
    `;
    const values = [title, description || null, director || null, release_year || null, genre || null, rating || null, id];

    const { rows } = await pool.query(updateSQL, values);
    if (rows.length === 0) return res.status(404).json({ error: 'Movie not found' });

    res.json(rows[0]);
  } catch (err) {
    console.error('Error updating movie:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- DELETE a movie -----------------------------------------------
// DELETE /movies/:id
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { rows } = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Movie not found' });
    res.json({ message: 'Movie deleted', movie: rows[0] });
  } catch (err) {
    console.error('Error deleting movie:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
