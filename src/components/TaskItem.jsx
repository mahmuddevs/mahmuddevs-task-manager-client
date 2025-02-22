import React from 'react';
import { useDrag } from 'react-dnd';
import { FaEdit, FaTrash } from "react-icons/fa";


const TaskItem = ({ task, handleDeleteTask, handleEditTask }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));


    return (
        <div ref={drag} className={`flex justify-between items-center ${isDragging ? 'opacity-90 drop-shadow-md' : ''}`}>
            <div className="bg-white p-4 mb-2 rounded-md shadow-sm cursor-grab w-11/12">
                <div className="flex items-center">
                    <h4 className="text-lg font-semibold w-8/12">{task.title}</h4>
                </div>
                <p>{task.description}</p>
            </div>
            <div className="flex flex-col justify-between gap-8">
                <FaTrash
                    onClick={() => handleDeleteTask(task._id)}
                    className={`cursor-pointer text-xl  text-red-700 transition-transform duration-300 hover:scale-150 ${isDragging ? 'hidden' : ''}`}
                />
                <FaEdit
                    onClick={() => handleEditTask(task)}
                    className={`cursor-pointer text-xl text-green-700 transition-transform duration-300 hover:scale-150 ${isDragging ? 'hidden' : ''}`}
                />
            </div>
        </div>
    );
};

export default TaskItem;
