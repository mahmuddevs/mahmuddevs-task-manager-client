import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleNavigateToTaskManager = () => {
        navigate('/task-manager');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to TaskMaster</h1>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-lg">
                TaskMaster helps you organize your tasks effectively. Add, edit, and track your tasks
                effortlessly. Get started today!
            </p>
            <button
                onClick={handleNavigateToTaskManager}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
                Go to Task Manager
            </button>
        </div>
    );
};

export default Home;
