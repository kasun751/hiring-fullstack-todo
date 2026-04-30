import axios from "axios";
import type { Todo } from "../types/todo";

const api = import.meta.env.VITE_API_URL


export const fetchTodos = async (): Promise<Todo[]> => {
    const res = await axios.get(api);
    return res.data;
};


export const createTodo = async (
    todo: Pick<Todo, "title" | "description">
): Promise<Todo> => {
    const res = await axios.post(api, todo);
    return res.data;
};


export const updateTodo = async (params: {
    id: string;
    data: Partial<Todo>;
}): Promise<Todo> => {
    const res = await axios.put(`${api}/${params.id}`, params.data);
    return res.data;
};


export const toggleTodo = async (id: string): Promise<Todo> => {
    const res = await axios.patch(`${api}/${id}/done`);
    return res.data;
};


export const deleteTodo = async (id: string): Promise<{ message: string }> => {
    const res = await axios.delete(`${api}/${id}`);
    return res.data;
};