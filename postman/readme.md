Got it ✅ — I’ll write you a **ready-to-use, proper README.md** for your **Movie Library API project** (not just an example). You can literally copy-paste this into your repo as `README.md`.

---

# 🎬 Movie Library API

The **Movie Library API** is a RESTful service built with **Node.js**, **Express**, and **PostgreSQL** (via Docker).
It allows you to perform CRUD operations on a movie database and includes a Postman collection for easy testing.

---

## 📌 Features

* 🔹 Health check endpoint (`/`)
* 🔹 Create new movies
* 🔹 Fetch all movies
* 🔹 Fetch a movie by ID
* 🔹 Update movie details
* 🔹 Delete movies
* 🔹 Ready-to-use **Postman Collection**

---

## 🛠️ Tech Stack

* **Node.js** + **Express.js** (API server)
* **PostgreSQL** (database, running in Docker)
* **Sequelize / pg** (database driver/ORM)
* **Postman** (API testing)

---

## 🚀 Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/movie-library-api.git
cd movie-library-api
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root of your project:

```env
DATABASE_URL=postgresql://postgres:1234@localhost:5432/movie_library
PORT=3000
```

### 4️⃣ Start PostgreSQL with Docker

```bash
docker run --name movie-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=1234 \
  -e POSTGRES_DB=movie_library \
  -p 5432:5432 \
  -d postgres
```

### 5️⃣ Run the API Server

```bash
npm run dev
```

Your API will now be live at:
👉 [http://localhost:3000](http://localhost:3000)

---

## 📮 API Endpoints

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| GET    | `/`           | Health check         |
| POST   | `/movies`     | Create a new movie   |
| GET    | `/movies`     | Get all movies       |
| GET    | `/movies/:id` | Get a movie by ID    |
| PUT    | `/movies/:id` | Update a movie by ID |
| DELETE | `/movies/:id` | Delete a movie by ID |

---

## 🧪 Postman Testing

This project includes a Postman collection file:
📁 **`Movie Library API.postman_collection.json`**

### Import into Postman:

1. Open Postman
2. Go to **File → Import**
3. Select the JSON collection file
4. Test all endpoints easily

---

## 📂 Project Structure

```
movie-library-api/
│── src/
│   ├── index.js         # Entry point
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── models/          # DB models
│── .env                 # Environment variables
│── package.json
│── README.md
│── Movie Library API.postman_collection.json
```

---

## 🧑‍💻 Author

**Omkar**
GitHub: http://github.com/Om13884/movie-library-api

---


