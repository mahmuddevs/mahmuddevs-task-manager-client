import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskColumn from './TaskColumn';
import useTaskDataByUserID from '../hooks/useTaskDataByUserID';
import useUserData from '../hooks/useUserData';
import useUpdateTask from '../hooks/useUpdateTask';

const TaskManager = () => {
    const [userData] = useUserData();
    const userID = userData?.userID;
    const [tasks, taskLoading, taskRefetch] = useTaskDataByUserID(userID);
    const { mutateAsync: updateTask, isLoading: isUpdating } = useUpdateTask();

    if (taskLoading) return <div>Loading tasks...</div>;
    if (!tasks || tasks.length === 0) return <div>No tasks available.</div>;

    const moveTask = async (taskId, newState) => {
        // Optimistic UI update
        const updatedTasks = tasks.map((task) =>
            task._id === taskId ? { ...task, state: newState } : task
        );

        taskRefetch(updatedTasks);

        try {
            await updateTask({ taskId, newState }); // Ensure this is awaited properly
            taskRefetch();
        } catch (error) {
            console.error('Error updating task state:', error);
            taskRefetch(tasks);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid md:grid-cols-3 gap-4 p-4 lg:w-9/12 mx-auto">
                {['to-do', 'in-progress', 'done'].map((state) => (
                    <TaskColumn
                        key={state}
                        state={state}
                        tasks={tasks.filter((task) => task.state === state)}
                        moveTask={moveTask}
                    />
                ))}
            </div>
        </DndProvider>
    );
};

export default TaskManager;
