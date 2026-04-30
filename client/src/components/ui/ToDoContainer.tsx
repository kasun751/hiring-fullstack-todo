import { useState } from "react";
import type {
    FilterType,
    SortType, Todo,
    TodoContainerProps
} from "../../types/todo.ts";
import TodoCard from "./ToDoCard.tsx";
import {
    useDeleteTodo,
    useToggleTodo,
    useUpdateTodo
} from "../../hooks/useTodos.ts";
import TodoFormModal from "../modals/TodoFormModal.tsx";
import {initialToDoObj} from "../../constant/todoConstants.ts";
import ConfirmationModal from "./ConfirmationModal.tsx";
import ModernLoader from "../common/ModernLoader.tsx";


export default function TodoContainer({
  todos,
  isLoading = false
}: TodoContainerProps) {
    const [filter, setFilter] = useState<FilterType>("all");
    const [sort, setSort] = useState<SortType>("newest");
    const deleteTodo = useDeleteTodo();
    const toggleTodo = useToggleTodo();

    const [selectedTodo, setSelectedTodo] = useState<Todo>(initialToDoObj);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
    const updateTodo = useUpdateTodo();

    const handleToggle = (id: string) => {
        toggleTodo.mutate(id);
    };

    const handleEdit = (todo: Todo) => {
        setSelectedTodo(todo);
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = (id: string) => {
        setSelectedTodo((prev) => ({
            ...prev,
            _id:id
        }));
        setIsDeleteModelOpen(true);
    };

    const handleDelete = () => {
        deleteTodo.mutate(selectedTodo._id);
        setIsDeleteModelOpen(false);
    };

    const handleSaveEdit = (data: {
        id: string;
        title: string;
        description?: string;
    }) => {
        updateTodo.mutate({
            id: data.id,
            data: {
                title: data.title,
                description: data.description,
            },
        });
        setIsModalOpen(false)
    };

    // Filter todos
    const filteredTodos = todos.filter(todo => {
        if (filter === "active") return !todo.done;
        if (filter === "completed") return todo.done;
        return true;
    });

    // Sort todos
    const sortedTodos = [...filteredTodos].sort((a, b) => {
        switch (sort) {
            case "newest":
                return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            case "oldest":
                return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
            case "alphabetical":
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    const stats = {
        total: todos.length,
        active: todos.filter(t => !t.done).length,
        completed: todos.filter(t => t.done).length,
        completionRate: todos.length > 0 ? Math.round((todos.filter(t => t.done).length / todos.length) * 100) : 0
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                        <div key={n} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 mb-5 min-h-screen">
            {/* Stats Bar */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
                        <div className="text-sm text-gray-600">Total Tasks</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{stats.active}</div>
                        <div className="text-sm text-gray-600">Active</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{stats.completionRate}%</div>
                        <div className="text-sm text-gray-600">Progress</div>
                    </div>
                </div>
                {stats.total > 0 && (
                    <div className="mt-3">
                        <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${stats.completionRate}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 px-10">
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter("all")}
                        className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                            filter === "all"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter("active")}
                        className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                            filter === "active"
                                ? "bg-yellow-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilter("completed")}
                        className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                            filter === "completed"
                                ? "bg-green-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Completed
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Sort by:</label>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortType)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="alphabetical">Alphabetical</option>
                    </select>
                </div>
            </div>

            {/* Todo Grid */}
            {sortedTodos.length === 0 ? (
                <div className="text-center py-12 px-4 bg-gray-50 rounded-lg px-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                        {filter === "all" && "No tasks yet"}
                        {filter === "active" && "No active tasks"}
                        {filter === "completed" && "No completed tasks"}
                    </h3>
                    <p className="text-gray-500">
                        {filter === "all" && "Create your first task above!"}
                        {filter === "active" && "All tasks are completed! 🎉"}
                        {filter === "completed" && "Complete some tasks to see them here"}
                    </p>
                </div>
            ) : (
                <>
                    <div className="text-sm text-gray-500 px-10">
                        Showing {sortedTodos.length} of {filteredTodos.length} tasks
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
                        {sortedTodos.map((todo) => (
                            <TodoCard
                                key={todo._id}
                                todo={todo}
                                onToggle={handleToggle}
                                onEdit={handleEdit}
                                onDelete={handleOpenDeleteModal}
                            />
                        ))}
                    </div>
                </>
            )}
            <TodoFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedTodo(initialToDoObj);
                }}
                onSubmit={(data)=>handleSaveEdit(data)}
                initialData={selectedTodo}
                mode="update"
                isLoading={updateTodo.isPending}
            />
            <ConfirmationModal
                isOpen={isDeleteModelOpen}
                onClose={()=>setIsDeleteModelOpen(false)}
                onConfirm={handleDelete}
                type="delete"
            />
            {
                (deleteTodo.isPending || updateTodo.isPending || isLoading )&& <ModernLoader/>
            }
        </div>
    );
}