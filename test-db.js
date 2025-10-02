const db = require('./src/db');

async function test() {
  try {
    const res = await db.query('SELECT NOW()');
    console.log('DB connected:', res.rows);
  } catch (err) {
    console.error('DB connection error:', err);
  }
}

test();
