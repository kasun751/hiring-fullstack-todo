import type {FloatingAddButtonProps} from "../../types/todo.ts";

export default function FloatingAddButton({ onClick, isOpen = false }: FloatingAddButtonProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-20 right-10 z-50 group"
            aria-label="Add new todo"
        >
            <div className="relative">
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20 group-hover:opacity-30"></div>

                {/* Button */}
                <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                    <div className="w-14 h-14 flex items-center justify-center">
                        <svg
                            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </div>
                </div>

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap">
                        Add new task
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-gray-800"></div>
                    </div>
                </div>
            </div>
        </button>
    );
}