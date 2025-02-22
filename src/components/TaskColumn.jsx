import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import TaskItem from './TaskItem';
import { FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

const TaskColumn = ({ state, tasks, moveTask }) => {
    const [addTask, setAddTask] = useState(false);
    const [, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => moveTask(item.id, state)
    }));

    const handleAddTask = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const taskData = Object.fromEntries(formData);
        const userID = userData?.userID;
        const taskInfo = { ...taskData, userID, state: "to-do" };

        const res = await axiosBase.post("/tasks", taskInfo);
        if (res?.data?.acknowledged) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Task Added Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            e.target.reset();
            setAddTask(false);
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something Went Wrong",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div ref={drop} className="flex flex-col min-h-[75vh] bg-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 flex items-center">
                {/* {icons[icon]} */}
                {state}
            </h2>
            <div className="flex-grow bg-white rounded-md p-2 min-h-[50vh]">
                <h2 className="text-xl font-semibold mb-4 capitalize">{state.replace('-', ' ')}</h2>
                {tasks.map((task) => (
                    <TaskItem key={task._id} task={task} />
                ))}
                <div className="p-4">
                    {
                        state === "to-do" && (
                            addTask ? (
                                <form onSubmit={handleAddTask}>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Task Name"
                                        className="outline-none border-b w-full h-11 mb-6"
                                        required
                                    />
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        className="outline-none border-b w-full"
                                        required
                                    ></textarea>
                                    <div className="space-x-4 mt-3">
                                        <button type="submit" className="btn btn-primary btn-sm">Add</button>
                                        <button type="button" onClick={() => setAddTask(false)} className="btn btn-neutral btn-sm">Cancel</button>
                                    </div>
                                </form>
                            ) : (
                                <div onClick={() => setAddTask(true)} className="flex items-center gap-4 cursor-pointer mt-2">
                                    <FaPlus /> Add Task
                                </div>
                            )
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default TaskColumn;



{/* <h2 className="text-xl font-semibold mb-4 capitalize">{state.replace('-', ' ')}</h2>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))} */}