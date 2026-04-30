import * as todoService from "../services/todoService.js";


export const getTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createTodo = async (req, res) => {
    try {
        const todo = await todoService.createTodo(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateTodo = async (req, res) => {
    try {
        const updated = await todoService.updateTodo(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const toggleDone = async (req, res) => {
    try {
        const updated = await todoService.toggleTodoDone(req.params.id);
        if (!updated) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteTodo = async (req, res) => {
    try {
        await todoService.deleteTodo(req.params.id);
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};