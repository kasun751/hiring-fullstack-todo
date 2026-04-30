export type FooterProps = {
    totalTasks?: number;
    completedTasks?: number;
};

export interface Todo {
    _id: string;
    title: string;
    description?: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TodoContainerProps = {
    todos: Todo[];
    isLoading?: boolean;
};

export type FilterType = "all" | "active" | "completed";
export type SortType = "newest" | "oldest" | "alphabetical";

export type FloatingAddButtonProps = {
    onClick: () => void;
    isOpen?: boolean;
};

export type TodoCardProps = {
    todo: Todo;
    onToggle: (id: string) => void;
    onEdit: (todo: Todo) => void;
    onDelete: (id: string) => void;
    showDescription?: boolean;
};

export type TodoFormModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        id: string;
        title: string;
        description?: string;
    }) => void;
    initialData: Todo;
    isLoading?: boolean;
    mode?: "create" | "delete" | "update" | "warning" | "info";
};

export type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    type: "delete" | "create" | "update" | "warning" | "info";
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    itemName?: string;
};