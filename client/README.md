# 📝 Full Stack TODO Application (Frontend)

A modern, responsive TODO application built using **React + TypeScript**, featuring clean architecture, form validation, and optimized server-state management.

This frontend communicates with a Node.js + Express backend and demonstrates real-world full-stack development practices.

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
- Modal-based create/edit form
- Loading indicators for async actions
- Error handling with user-friendly messages
- Toast notifications for success/failure feedback
- Smooth transitions and hover effects
- Responsive design (mobile + desktop)

### 🛡️ Validation
- Frontend form validation using Zod
- Real-time error feedback
- Prevents invalid submissions

---

## 🏗️ Project Architecture

The project follows a modular and scalable structure:

```txt
src/
│
├── api/            # Axios API layer
├── assets/         # Project Assests
├── components/     # Reusable UI components
│       ├──common/  # Common UI Component
│       ├──modals/  # Modal UI Components
│       ├──ui/      # Other UI Components
├── hooks/          # React Query custom hooks
├── pages/          # Page-level components (if routing used)
├── validation/     # Zod schemas
├── types/          # TypeScript interfaces/types
├── App.tsx
└── main.tsx