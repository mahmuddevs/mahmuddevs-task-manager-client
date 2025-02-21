import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { FaTimes } from "react-icons/fa";

export default function TaskItem({ task }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
    });

    const style = transform
        ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className="bg-white p-4 mb-2 rounded-md shadow-sm cursor-grab"
        >
            <div className="flex items-center">
                <h4 className="text-lg font-semibold w-8/12">{task.title}</h4>
                <FaTimes className="ms-auto cursor-pointer transition-transform duration-300 hover:scale-150 self-start mt-2" />
            </div>
            <p>{task.description}</p>
        </div>
    );
}
