# 📝 Full Stack TODO Application (Backend)

This is the backend service for a full-stack TODO application built using **Node.js, Express.js, and MongoDB**.

It provides a RESTful API for managing TODO items with full CRUD functionality.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-validator (request validation)
- dotenv
- cors

---

## ✨ Features

### 🧩 Core Features
- Create TODO
- Get all TODOs
- Update TODO (title/description)
- Toggle TODO completion status
- Delete TODO

### 🛡️ Backend Features
- Input validation using express-validator
- Clean layered architecture (Controller → Service → Model)
- Centralized error handling
- MongoDB data persistence
- RESTful API design

---

## 🏗️ Project Structure

```txt id="backend_structure_002"
src/
│
├── config/         # DB configuration
├── controllers/    # Request handlers
├── services/       # Business logic
├── models/         # Mongoose schemas
├── routes/         # API routes
├── validators/     # Request validation rules
└── server.js

```

## ⚙️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```
### 1. Run Project

```bash
npm run dev
```
- Copy `.example.env` to `.env` and configure the required environment variables.


## ⚠️ Assumptions
- Backend is running locally on port 5000
- MongoDB is properly connected in backend
- No authentication system implemented
- Single-user TODO application

## 📌 Limitations
- No authentication or multi-user support
- No pagination or filtering
- No offline support
- Basic caching via React Query only

## 🚀 Future Improvements
- JWT authentication system
- Drag & drop task ordering
- Pagination / infinite scroll
- Dark mode support