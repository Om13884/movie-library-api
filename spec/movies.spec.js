const request = require('supertest');
const app = require('../src/index'); // your Express app

describe("Movie Library API CRUD", () => {
  let movieId;

  // --- CREATE ---
  it("should create a new movie", async () => {
    const res = await request(app)
      .post('/movies')
      .send({
        title: "Test Movie",
        description: "This is only a test",
        director: "Test Director",
        release_year: 2025,
        genre: "Test",
        rating: 8.5
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe("Test Movie");

    movieId = res.body.id; // save for later tests
  });

  // --- READ ALL ---
  it("should list movies", async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTrue();
    expect(res.body.length).toBeGreaterThan(0);
  });

  // --- READ ONE ---
  it("should get a single movie by ID", async () => {
    const res = await request(app).get(`/movies/${movieId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(movieId);
    expect(res.body.title).toBe("Test Movie");
  });

  // --- UPDATE ---
  it("should update a movie", async () => {
    const res = await request(app)
      .put(`/movies/${movieId}`)
      .send({
        title: "Updated Movie",
        description: "Updated description",
        director: "Updated Director",
        release_year: 2026,
        genre: "Drama",
        rating: 9.0
      });

    expect(res.status).toBe(200);
    expect(res.body.title).toBe("Updated Movie");
    expect(res.body.release_year).toBe(2026);
  });

  // --- DELETE ---
  it("should delete a movie", async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Movie deleted");
    expect(res.body.movie.id).toBe(movieId);
  });

  // --- CONFIRM DELETE ---
  it("should return 404 for deleted movie", async () => {
    const res = await request(app).get(`/movies/${movieId}`);
    expect(res.status).toBe(404);
  });
});
