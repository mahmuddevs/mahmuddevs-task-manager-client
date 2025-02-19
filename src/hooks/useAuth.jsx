import { useContext } from "react"
import { AuthContext } from "../porviders/AuthProvider"

const useAuth = () => {
    return useContext(AuthContext)
}
export default useAuth