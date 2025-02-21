import TaskManager from "../../components/TaskManager"


const Home = () => {
    return (
        <>
            <section className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-8 text-center">Task Manager</h1>
                <TaskManager />
            </section>
        </>
    )
}
export default Home