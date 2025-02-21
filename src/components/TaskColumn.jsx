import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";
import { FaClipboardList, FaSpinner, FaCheckCircle } from "react-icons/fa";
import useUserData from "../hooks/useUserData";
import useAxios from "../hooks/useAxios";

const icons = {
    clipboard: <FaClipboardList className="mr-2 text-blue-500" />,
    spinner: <FaSpinner className="mr-2 text-yellow-500" />,
    "check-circle": <FaCheckCircle className="mr-2 text-green-500" />,
};

export default function TaskColumn({ title, columnId, tasks, icon }) {
    const [addTask, setAddTask] = useState(false)
    const [userData, userLoading] = useUserData()
    const axiosBase = useAxios()

    const handleAddTask = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const taskData = Object.fromEntries(formData)
        const userID = userData?.userID
        const taskInfo = { ...taskData, userID, state: 'to-do' }

        const res = await axiosBase.post('/tasks', taskInfo)
        if (res?.data?.acknowledged) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Task Added Successfully",
                showConfirmButton: false,
                timer: 1500
            });
            e.target.reset()
            setAddTask(false)
        } else {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Something Went Wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }



    const { setNodeRef } = useDroppable({ id: columnId });

    const filteredTasks = tasks.filter((task) => task.state === columnId);

    return (
        <div className="flex flex-col min-h-[75vh] bg-gray-200 rounded-lg p-4">
            <h2 className="text-lg font-bold mb-4 flex items-center">
                {icons[icon]}
                {title}
            </h2>

            <div ref={setNodeRef} className="flex-grow bg-white rounded-md p-2 min-h-[50vh]">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => <TaskItem key={task._id} task={task} />)
                ) : (
                    <p className="text-gray-500">No tasks here!</p>
                )}
            </div>
        </div>
    );
}
