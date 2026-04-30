import Todo from "../models/Todo.js";

// Get all todos
export const getAllTodos = async () => {
    return await Todo.find().sort({ createdAt: -1 });
};

// Create todo
export const createTodo = async (data) => {
    return await Todo.create(data);
};

// Update todo (title/description)
export const updateTodo = async (id, data) => {
    return await Todo.findByIdAndUpdate(id, data, { new: true });
};

// Toggle done
export const toggleTodoDone = async (id) => {
    const todo = await Todo.findById(id);
    if (!todo) return null;

    todo.done = !todo.done;
    return await todo.save();
};

// Delete todo
export const deleteTodo = async (id) => {
    return await Todo.findByIdAndDelete(id);
};