# 📝 Full Stack TODO Application (Frontend)

A modern, responsive **TODO application** built using **React + TypeScript**, demonstrating clean architecture, form validation, and efficient server-state management.

This frontend communicates with a Node.js + Express backend and follows real-world production-level development practices.

---

## 🚀 Tech Stack

- React 18+
- TypeScript
- React Query (@tanstack/react-query)
- React Hook Form
- Zod (schema validation)
- Axios
- Tailwind CSS
- React Hot Toast

---

## ✨ Features

### 🧩 Core Features
- Create TODO items
- View all TODOs
- Edit TODO items
- Delete TODO items
- Mark TODO as completed / pending

### ⚡ UI/UX Features
- Modal-based create/edit forms
- Loading indicators during API calls
- Toast notifications for success & error feedback
- Smooth transitions and hover effects
- Responsive design (mobile & desktop friendly)

### 🛡️ Validation
- Frontend validation using **Zod**
- Real-time error messages
- Prevents invalid submissions before API calls

---

## 🏗️ Project Architecture

The project follows a **modular and scalable structure**:

```txt
src/
│
├── api/            # Axios API layer (backend communication)
├── assets/         # Static assets (images, icons, etc.)
├── components/
│   ├── common/     # Reusable UI components
│   ├── modals/     # Create/Edit Todo modals
│   ├── ui/         # Generic UI components (buttons, loaders, etc.)
│
├── hooks/          # React Query custom hooks (API logic)
├── pages/          # Page-level components (if routing used)
├── validation/     # Zod schemas
├── types/          # TypeScript interfaces & types
├── utils/          # Helper functions & constants
├── App.tsx
└── main.tsx
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

## 🔗 Backend Dependency

### This frontend requires the backend service to be running:

- Backend URL: http://localhost:5000
- API Base Path: /api/todos

## ⚠️ Assumptions
- MongoDB is properly configured and running
- No authentication system is implemented (public API)
- Single-user TODO application
- All requests and responses are JSON-based

## 📌 Limitations
- No authentication / authorization
- No pagination or filtering
- No caching layer (Redis not used)
- No rate limiting or security hardening
- Basic error handling only (no advanced logging system)

## 🚀 Future Improvements
- JWT authentication system
- User-based TODO management
- Pagination and filtering
- Redis caching layer
- Docker containerization
- Rate limiting and security enhancements