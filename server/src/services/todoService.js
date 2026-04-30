import Todo from "../models/Todo.js";
import mongoose from "mongoose";
import {AppError} from "../utils/AppError.js";

/**
 * Fetch all todos from database
 */
export const getAllTodos = async () => {
    try {
        const todos = await Todo.find()
            .sort({ createdAt: -1 })
            .lean(); // Improves performance by returning plain JS objects

        return todos;
    } catch (error) {
        throw new Error(`Failed to fetch todos: ${error.message}`);
    }
};

/**
 * Create a new todo in DB
 */
export const createTodo = async (data) => {
    try {
        const todo = await Todo.create(data);

        if (!todo) {
            throw new AppError("Failed to create todo", 500);
        }

        return todo;
    } catch (error) {
        if (error.name === "ValidationError") {
            throw new AppError(error.message, 400);
        }

        throw new AppError(
            error.message || "Database error while creating todo",
            error.statusCode || 500
        );
    }
};

/**
 * Update todo by ID
 */
export const updateTodo = async (id, data) => {
    try {
        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid Todo ID", 400);
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            data,
            {
                new: true, // Return updated document
                runValidators: true, // Apply schema validation
            }
        );

        if (!updatedTodo) {
            throw new AppError("Todo not found", 404);
        }

        return updatedTodo;
    } catch (error) {
        if (error.name === "ValidationError") {
            throw new AppError(error.message, 400);
        }

        throw new AppError(
            error.message || "Database error while updating todo",
            error.statusCode || 500
        );
    }
};

/**
 * Toggle todo done status
 */
export const toggleTodoDone = async (id) => {
    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid Todo ID", 400);
        }

        const todo = await Todo.findById(id);

        if (!todo) {
            throw new AppError("Todo not found", 404);
        }

        todo.done = !todo.done;

        const updatedTodo = await todo.save();

        return updatedTodo;
    } catch (error) {
        if (error.name === "ValidationError") {
            throw new AppError(error.message, 400);
        }

        throw new AppError(
            error.message || "Database error while toggling todo status",
            error.statusCode || 500
        );
    }
};

/**
 * Delete todo from database
 */
export const deleteTodo = async (id) => {
    try {
        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid Todo ID", 400);
        }

        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            throw new AppError("Todo not found", 404);
        }

        return deletedTodo;
    } catch (error) {
        throw new AppError(
            error.message || "Database error while deleting todo",
            error.statusCode || 500
        );
    }
};