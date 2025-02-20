import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxios from "./useAxios"

const useUserData = () => {
    const { user } = useAuth()
    const axiosBase = useAxios()

    const { data: userData, loading: userLoading } = useQuery({
        queryKey: ['single-user', user?.email],
        queryFn: async () => {
            const res = await axiosBase.get(`/users/${email}`)

            return res.data
        }
    })

    return [userData, userLoading]
}
export default useUserData