import type { TodoCardProps } from "../../types/todo.ts";

export default function TodoCard({
     todo,
     onToggle,
     onEdit,
     onDelete,
     showDescription = true
 }: TodoCardProps) {
    const formatDate = (date: Date | string) => {
        const d = new Date(date);
        return d.toLocaleDateString([], {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const isUpdated = todo.updatedAt && todo.updatedAt !== todo.createdAt;
    const createdDate = todo.createdAt ? formatDate(todo.createdAt) : null;
    const updatedDate = isUpdated && todo.updatedAt ? formatDate(todo.updatedAt) : null;

    return (
        <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-gray-300 flex flex-col h-full">
            {/* Header Section with Checkbox and Title */}
            <div className="p-4 flex-1">
                <div className="flex items-start gap-3">
                    {/* Custom checkbox */}
                    <button
                        onClick={() => onToggle(todo._id)}
                        className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
                            todo.done
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300 hover:border-green-400"
                        }`}
                        title={todo.done ? "Mark as incomplete" : "Mark as complete"}
                    >
                        {todo.done && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </button>

                    {/* Title and Description */}
                    <div className="flex-1 min-w-0">
                        <h3 className={`font-medium break-words ${
                            todo.done
                                ? "line-through text-gray-400"
                                : "text-gray-800"
                        }`}>
                            {todo.title}
                        </h3>

                        {showDescription && todo.description && (
                            <p className={`text-sm mt-1 break-words line-clamp-2 ${
                                todo.done
                                    ? "line-through text-gray-300"
                                    : "text-gray-500"
                            }`}>
                                {todo.description}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer with Dates and Actions */}
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                {/* Date Information */}
                <div className="flex flex-wrap items-center gap-3 mb-3 pb-2 border-b border-gray-200 text-xs">
                    {createdDate && (
                        <div className="flex items-center gap-1 text-gray-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Created: {createdDate}</span>
                        </div>
                    )}

                    {updatedDate && (
                        <div className="flex items-center gap-1 text-gray-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>Updated: {updatedDate}</span>
                        </div>
                    )}

                    {!createdDate && !updatedDate && (
                        <div className="flex items-center gap-1 text-gray-400">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>No date info</span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onToggle(todo._id)}
                        className="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 flex items-center gap-1"
                        title={todo.done ? "Mark as incomplete" : "Mark as complete"}
                    >
                        {todo.done ? (
                            <>
                                <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-green-600">Completed</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-3.5 h-3.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-600">Pending</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={() => onEdit(todo)}
                        className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-all duration-200 flex items-center gap-1"
                        title="Edit todo"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Edit</span>
                    </button>

                    <button
                        onClick={() => onDelete(todo._id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-all duration-200 flex items-center gap-1"
                        title="Delete todo"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </div>
    );
}