import { useQuery } from "@tanstack/react-query"
import useAxios from "./useAxios"

const useTaskDataByUserID = (userID) => {
    const axiosBase = useAxios()

    const { data: tasks = [], isLoading: taskLoading, refetch: taskRefetch } = useQuery({
        queryKey: ['user-id',],
        queryFn: async () => {
            const res = await axiosBase.get(`/tasks/${userID}`)
            return res.data
        },
        enabled: !!userID
    })

    return [tasks, taskLoading, taskRefetch]
}

export default useTaskDataByUserID