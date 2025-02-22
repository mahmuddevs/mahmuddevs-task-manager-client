import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useDeleteTask = () => {
    const axiosBase = useAxios();
    const queryClient = useQueryClient();

    const deleteTaskApi = async (taskId) => {
        const response = await axiosBase.delete(`/tasks/${taskId}`);
        if (!response.data) throw new Error("Error deleting task");
        return response.data;
    };

    const mutation = useMutation({
        mutationFn: deleteTaskApi,
        onError: (error) => {
            console.error("Error deleting task: ", error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
            console.log("Task deleted successfully");
        },
    });

    const deleteTask = (taskId) => {
        mutation.mutate(taskId);
    };

    return {
        deleteTask,
        isDeleting: mutation.isLoading,
        isError: mutation.isError,
    };
};

export default useDeleteTask;
