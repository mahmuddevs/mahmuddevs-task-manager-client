import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxios from "./useAxios"

const useUserData = () => {
    const { user } = useAuth()
    const axiosBase = useAxios()

    const { data: userData, isLoading: userLoading } = useQuery({
        queryKey: ['single-user', user?.email],
        queryFn: async () => {
            const res = await axiosBase.get(`/users/${user.email}`)
            return res.data
        },
        enabled: !!user?.email
    })

    return [userData, userLoading]
}

export default useUserData
