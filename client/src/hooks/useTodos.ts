import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types/todo";
import toast from "react-hot-toast";
import {
    fetchTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    deleteTodo,
} from "../api/todoApi";

export const useTodos = () => {
    return useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: fetchTodos,
    });
};

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTodo,
        onSuccess: () => {
            toast.success("Todo created successfully!");
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
        onError: () => {
            toast.error(
                "Failed to create todo"
            );
        }
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast.success("Todo updated successfully!");
        },
        onError: () => {
            toast.error("Failed to update todo");
        }
    });
};

export const useToggleTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: toggleTodo,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            if (data.done) {
                toast.success("Todo Marked As Done!");
            }else{
                toast.success("Todo Marked As Pending!");
            }
        },
        onError: () => {
        toast.error("Failed to Mark todo");
    }
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            toast.success("Todo deleted successfully!");
        },
        onError: () => {
            toast.error("Failed to delete todo");
        }
    });
};
