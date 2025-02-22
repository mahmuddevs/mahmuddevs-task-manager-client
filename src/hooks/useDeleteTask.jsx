import { useMutation } from '@tanstack/react-query';
import useAxios from './useAxios';

// Function to delete a task from the backend
const deleteTaskInBackend = async (taskId) => {
    const axiosBase = useAxios();
    try {
        const response = await axiosBase.delete(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting task');
    }
};

// Custom hook to delete task and handle optimistic updates
const useDeleteTask = () => {
    const mutation = useMutation({
        mutationFn: deleteTaskInBackend,
        onMutate: (taskId) => {
            // Optimistic update: immediately remove the task from the UI
            // This ensures the UI is updated instantly before the mutation completes
            console.log('Optimistically deleting task:', taskId);
        },
        onSuccess: (data, taskId, context) => {
            // Optionally, refetch data after mutation is successful
            console.log('Task deleted successfully:', data);
            context.refetch();
        },
        onError: (error, taskId, context) => {
            console.error('Error deleting task:', error);
            // Optionally rollback the task deletion if mutation fails
        }
    });

    return {
        mutate: mutation.mutate,
        isLoading: mutation.isLoading
    };
};

export default useDeleteTask;
