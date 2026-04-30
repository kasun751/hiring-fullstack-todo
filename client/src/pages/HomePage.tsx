import TodoHeader from "../components/common/Header.tsx";
import TodoContainer from "../components/ui/ToDoContainer.tsx";
import {useCreateTodo, useTodos} from "../hooks/useTodos.ts";
import FloatingAddButton from "../components/ui/FloatingAddButton.tsx";
import {useState} from "react";
import ToDoFooter from "../components/common/Footer.tsx";
import TodoFormModal from "../components/modals/TodoFormModal.tsx";
import {initialToDoObj} from "../constant/todoConstants.ts";
import ModernLoader from "../components/common/ModernLoader.tsx";

const HomePage = () => {
    const { data: todos, isLoading } = useTodos();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const createTodo = useCreateTodo();

    const handleAdd = (data:{
        title: string;
        description?: string;
    }) => {
        createTodo.mutate(data);
        setIsCreateModalOpen(false);
    };
    return (
        <div>
            <TodoHeader />
            <TodoContainer
                todos={todos??[]}
                isLoading={isLoading}
            />
            <FloatingAddButton
                onClick={()=>setIsCreateModalOpen(!isCreateModalOpen)}
                isOpen={isCreateModalOpen}
            />
            <TodoFormModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={(data) => handleAdd(data)}
                mode="create"
                initialData={initialToDoObj}
                isLoading={createTodo.isPending}
            />
            {
                isLoading &&
                <ModernLoader
                    text={`Loading...`}
                />
            }
            <ToDoFooter />
        </div>
    );
};

export default HomePage;