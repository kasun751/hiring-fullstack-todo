import { useEffect } from "react";
import type {ConfirmationModalProps} from "../../types/todo.ts";

export default function ConfirmationModal({
                                              isOpen,
                                              onClose,
                                              onConfirm,
                                              type = "delete",
                                              title,
                                              message,
                                              confirmText,
                                              cancelText = "Cancel",
                                              isLoading = false,
                                              itemName
                                          }: ConfirmationModalProps) {
    // Handle escape key press
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Get configuration based on type
    const getConfig = () => {
        switch (type) {
            case "delete":
                return {
                    defaultTitle: "Delete Confirmation",
                    defaultMessage: itemName
                        ? `Are you sure you want to delete "${itemName}"?`
                        : "Are you sure you want to delete this item?",
                    defaultConfirmText: "Delete",
                    icon: (
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                    ),
                    confirmButtonClass: "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                };

            case "create":
                return {
                    defaultTitle: "Create Confirmation",
                    defaultMessage: itemName
                        ? `Are you sure you want to create "${itemName}"?`
                        : "Are you sure you want to create this item?",
                    defaultConfirmText: "Create",
                    icon: (
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    ),
                    confirmButtonClass: "bg-green-600 hover:bg-green-700 focus:ring-green-500"
                };

            case "update":
                return {
                    defaultTitle: "Update Confirmation",
                    defaultMessage: itemName
                        ? `Are you sure you want to update "${itemName}"?`
                        : "Are you sure you want to update this item?",
                    defaultConfirmText: "Update",
                    icon: (
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                        </div>
                    ),
                    confirmButtonClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                };

            case "warning":
                return {
                    defaultTitle: "Warning",
                    defaultMessage: message || "Are you sure you want to proceed?",
                    defaultConfirmText: "Proceed",
                    icon: (
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                            <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    ),
                    confirmButtonClass: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
                };

            case "info":
                return {
                    defaultTitle: "Information",
                    defaultMessage: message || "Please confirm your action",
                    defaultConfirmText: "OK",
                    icon: (
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    ),
                    confirmButtonClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                };

            default:
                return {
                    defaultTitle: "Confirmation",
                    defaultMessage: "Are you sure?",
                    defaultConfirmText: "Confirm",
                    icon: null,
                    confirmButtonClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                };
        }
    };

    const config = getConfig();
    const finalTitle = title || config.defaultTitle;
    const finalMessage = message || config.defaultMessage;
    const finalConfirmText = confirmText || config.defaultConfirmText;

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 animate-fadeIn"
            onClick={onClose}
        >
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                {/* Background overlay */}
                {/*<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />*/}

                {/* Center modal */}
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-slideIn"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            {/* Icon */}
                            {config.icon && (
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                                    {config.icon}
                                </div>
                            )}

                            {/* Text Content */}
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">
                                    {finalTitle}
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {finalMessage}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
                        <button
                            type="button"
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${config.confirmButtonClass} ${
                                isLoading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : (
                                finalConfirmText
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}