/**
 * Mongoose schema definition for Todo collection.
 *
 * This schema represents a Todo item with:
 *
 * - title: Required string field, trimmed to remove extra spaces
 * - description: Optional string field with default empty value
 * - done: Boolean flag to track completion status (default: false)
 *
 * Schema options:
 * - timestamps: Automatically adds createdAt and updatedAt fields
 *   for tracking record creation and modification times
 */
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        done: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;