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

router.get("/", getTodos);
router.post("/", validateTodo, createTodo);
router.put("/:id", validateTodo, updateTodo);
router.patch("/:id/done", toggleDone);
router.delete("/:id", deleteTodo);

export default router;