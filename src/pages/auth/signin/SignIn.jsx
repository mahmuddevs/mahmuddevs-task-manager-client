import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2'
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const { loginWithGoogle } = useAuth()
    const axiosBase = useAxios()
    const navigate = useNavigate()

    const handleGoogleSignIn = () => {
        loginWithGoogle()
            .then((res) => {
                const email = res?.user?.email
                const displayName = res?.user?.displayName
                const userID = email.split('@')[0]

                const userdata = {
                    email,
                    displayName,
                    userID
                }

                axiosBase.post('/users/add', userdata)
                    .then((res) => {
                        if (res.data.acknowledged) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Welcome ${displayName}`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        if (res.data.existing) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `Welcome Back`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        navigate('/')
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <div className="bg-white p-14 rounded-lg shadow-md max-w-lg">
                <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
                    Welcome to TaskMaster
                </h2>
                <p className="text-center mb-6 text-gray-600">
                    Manage your tasks efficiently and stay organized. Sign in with Google to get started and track your progress.
                </p>
                <button
                    onClick={handleGoogleSignIn}
                    className="btn btn-neutral text-white rounded-lg w-full flex items-center justify-center space-x-3"
                >
                    <FcGoogle className="text-white text-3xl" />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div>
    )
}
export default SignIn