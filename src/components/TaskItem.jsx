import { useDrag } from 'react-dnd';
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useDeleteTask from "../hooks/useDeleteTask";

const TaskItem = ({ task }) => {
    const { deleteTask, isDeleting } = useDeleteTask();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    const handleDeleteTask = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteTask(task._id)
                Swal.fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div ref={drag} className={`flex justify-between items-center ${isDragging ? 'opacity-90 drop-shadow-md' : ''}`}>
            <div
                className="bg-white p-4 mb-2 rounded-md shadow-sm cursor-grab w-11/12"
            >
                <div className="flex items-center">
                    <h4 className="text-lg font-semibold w-8/12">{task.title}</h4>
                </div>
                <p>{task.description}</p>
            </div>
            <FaTimes
                onClick={handleDeleteTask}
                className={`cursor-pointer transition-transform duration-300 hover:scale-150 self-start mt-7 mr-3 ${isDragging ? 'hidden' : ''}`}
            />
        </div>

        // <div
        //     ref={drag}
        //     className={`p-2 bg-white rounded shadow mb-2 ${isDragging ? 'opacity-50' : ''}`}
        // >
        //     <h4 className="font-bold">{task.title}</h4>
        //     <p>{task.description}</p>
        // </div>
    );
};

export default TaskItem;



