import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TodoFormModalProps } from "../../types/todo";
import {todoSchema, type TodoFormData} from "../../validation/todoSchema.ts";
import ConfirmationModal from "../ui/ConfirmationModal.tsx";

export default function TodoFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
  mode = "create"
}: TodoFormModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setValue
    } = useForm<TodoFormData>({
        resolver: zodResolver(todoSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            description: ""
        }
    });
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const modalTitle = mode === "create" ? "Add New Todo" : "Edit Todo";
    const submitLabel = mode === "create" ? "Add Todo" : "Save Changes";

    // Reset form when modal opens/closes or mode changes
    useEffect(() => {
        if (!isOpen) {
            reset({
                title: "",
                description: ""
            });
            return;
        }

        if (mode === "update" && initialData) {
            setValue("title", initialData.title);
            setValue("description", initialData.description || "");
        } else if (mode === "create") {
            reset({
                title: "",
                description: ""
            });
        }
    }, [isOpen, mode, initialData, reset, setValue]);

    if (!isOpen) return null;

    const onFormSubmit = (data: TodoFormData) => {
        const submitData: { id?: string; title: string; description?: string } = {
            title: data.title.trim(),
            description: data.description?.trim() || undefined,
        };

        if (mode === "update" && initialData?._id) {
            submitData.id = initialData._id;
        }
        setIsConfirmationModalOpen(false)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        onSubmit(submitData);

        if (mode === "create") {
            reset({
                title: "",
                description: ""
            });
        }
    };

    const handleClose = () => {
        reset({
            title: "",
            description: ""
        });
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-lg shadow-2xl w-[500px] max-w-[90%] animate-slideIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {modalTitle}
                            </h2>
                            {mode === "update" && initialData && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Editing: {initialData.title}
                                </p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            disabled={isLoading || isSubmitting}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Body */}
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="px-6 py-4 space-y-4">
                        {/* Title Input */}
                        <div>
                            <label htmlFor="modal-title" className="block text-sm font-medium text-gray-700 mb-2">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="modal-title"
                                type="text"
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ${
                                    errors.title
                                        ? "border-red-500 bg-red-50"
                                        : "border-gray-300"
                                }`}
                                {...register("title")}
                                placeholder="Enter todo title..."
                                disabled={isLoading || isSubmitting}
                                autoFocus
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                            )}
                        </div>

                        {/* Description Input */}
                        <div>
                            <label htmlFor="modal-description" className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                                <span className="text-xs text-gray-500 ml-2">(Optional)</span>
                            </label>
                            <textarea
                                id="modal-description"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                                {...register("description")}
                                placeholder="Add a detailed description..."
                                rows={4}
                                disabled={isLoading || isSubmitting}
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                            )}
                            <p className="mt-1 text-xs text-gray-500">
                                Max 500 characters
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
                            disabled={isLoading || isSubmitting}
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={isLoading || isSubmitting}
                            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition duration-200 flex items-center gap-2 ${
                                isLoading || isSubmitting
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            }`}
                            onClick={()=>setIsConfirmationModalOpen(true)}
                        >
                            {(isLoading || isSubmitting) ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {mode === "create" ? "Adding..." : "Saving..."}
                                </>
                            ) : (
                                submitLabel
                            )}
                        </button>
                    </div>
                </form>
            </div>
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={()=>setIsConfirmationModalOpen(false)}
                onConfirm={handleSubmit(onFormSubmit)}
                type={mode}
            />
        </div>
    );
}