import React, { useState } from "react";
import {
    DndContext,
    closestCorners,
    PointerSensor,
    TouchSensor,
    KeyboardSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";

const initialTasks = [
    { _id: "1", title: "Task 1", description: "Description for Task 1", state: "to-do" },
    { _id: "2", title: "Task 2", description: "Description for Task 2", state: "in-progress" },
    { _id: "3", title: "Task 3", description: "Description for Task 3", state: "done" },
];

export default function TaskManager() {
    const [tasks, setTasks] = useState(initialTasks);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const draggedTask = tasks.find((task) => task._id === activeId);
        if (!draggedTask) return;

        const newState = overId.includes("to-do")
            ? "to-do"
            : overId.includes("in-progress")
                ? "in-progress"
                : "done";

        const updatedTasks = tasks.map((task) =>
            task._id === activeId ? { ...task, state: newState } : task
        );

        const currentColumnTasks = updatedTasks.filter((task) => task.state === newState);
        const oldIndex = currentColumnTasks.findIndex((task) => task._id === activeId);
        const newIndex = currentColumnTasks.findIndex((task) => task._id === overId);

        if (oldIndex !== -1 && newIndex !== -1) {
            arrayMove(currentColumnTasks, oldIndex, newIndex);
        }

        setTasks(updatedTasks);
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <div className="grid md:grid-cols-3 gap-4">
                <TaskColumn title="To-Do" columnId="to-do" tasks={tasks} icon="clipboard" />
                <TaskColumn title="In Progress" columnId="in-progress" tasks={tasks} icon="spinner" />
                <TaskColumn title="Done" columnId="done" tasks={tasks} icon="check-circle" />
            </div>
        </DndContext>
    );
}
