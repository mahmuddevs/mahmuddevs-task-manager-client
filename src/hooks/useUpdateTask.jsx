import { useMutation } from '@tanstack/react-query';
import useAxios from './useAxios';

// Function to update task in the backend
const updateTaskInBackend = async ({ taskId, newState }) => {
    const axiosBase = useAxios();
    const response = await axiosBase.patch(`/tasks/update-state/${taskId}`, { state: newState });
    return response.data;
};

const useUpdateTask = () => {
    const mutation = useMutation({
        mutationFn: updateTaskInBackend,
        onError: (error) => {
            console.error('Error during task update:', error);
        }
    });

    return {
        mutate: mutation.mutate,
        mutateAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading
    };
};

export default useUpdateTask;
