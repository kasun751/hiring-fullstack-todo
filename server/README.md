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