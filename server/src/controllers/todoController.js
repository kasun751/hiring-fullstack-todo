import * as todoService from "../services/todoService.js";

/**
 * Get all todos
 * Handles request and sends standardized response
 */
export const getTodos = async (req, res, next) => {
    try {
        const todos = await todoService.getAllTodos();

        return res.status(200).json({
            success: true,
            message: "Todos fetched successfully",
            data: todos,
        });
    } catch (error) {
        next(error); // Pass error to centralized error handler
    }
};


/**
 * Create a new todo
 * Validation is already handled by validateTodo middleware
 */
export const createTodo = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        const todo = await todoService.createTodo({
            title,
            description,
        });

        return res.status(201).json({
            success: true,
            message: "Todo created successfully",
            data: todo,
        });
    } catch (error) {
        next(error);
    }
};


/**
 * Update an existing todo
 */
export const updateTodo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const updatedTodo = await todoService.updateTodo(id, {
            title,
            description,
        });

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: updatedTodo,
        });
    } catch (error) {
        next(error);
    }
};


/**
 * Toggle todo completion status
 */
export const toggleDone = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedTodo = await todoService.toggleTodoDone(id);

        return res.status(200).json({
            success: true,
            message: `Todo marked as ${updatedTodo.done ? "completed" : "incomplete"}`,
            data: updatedTodo,
        });
    } catch (error) {
        next(error);
    }
};


/**
 * Delete todo by ID
 */
export const deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        await todoService.deleteTodo(id);

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};