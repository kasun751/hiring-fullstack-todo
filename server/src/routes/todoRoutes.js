/**
 * Todo routes definition.
 *
 * This file defines all REST API endpoints for Todo operations:
 *
 * GET    /         -> Fetch all todos
 * POST   /         -> Create a new todo (with validation)
 * PUT    /:id      -> Update an existing todo (with validation)
 * PATCH  /:id/done -> Toggle completion status of a todo
 * DELETE /:id      -> Delete a todo
 *
 * Middleware usage:
 * - validateTodo: Ensures request body is valid before creating/updating
 */

import express from "express";
import {
    getTodos,
    createTodo,
    updateTodo,
    toggleDone,
    deleteTodo,
} from "../controllers/todoController.js";

import { validateTodo } from "../validators/validateTodo.js";

const router = express.Router();

// Get all todos
router.get("/", getTodos);

// Create new todo (with validation)
router.post("/", validateTodo, createTodo);

// Update todo (with validation)
router.put("/:id", validateTodo, updateTodo);

// Toggle todo completion status
router.patch("/:id/done", toggleDone);

// Delete todo by ID
router.delete("/:id", deleteTodo);

export default router;