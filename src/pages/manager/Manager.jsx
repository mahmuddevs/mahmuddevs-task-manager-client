import TaskManager from "../../components/TaskManager"
import useAuth from "../../hooks/useAuth"
const Manager = () => {
    const { logOut } = useAuth()

    const handleLogout = () => {
        logOut().then(() => {
            console.log('user logged out')
        })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <section className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
            <div className="flex justify-end md:container"><button onClick={handleLogout} className="btn btn-sm btn-primary">Logout</button></div>
            <TaskManager />
        </section>
    )
}
export default Manager