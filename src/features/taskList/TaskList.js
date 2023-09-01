
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, selectAllTasks } from "./taskListSlice"
import './TaskList.css'
import AddTaskBar from "../addTaskBar/AddTaskBar"

const Task = ({ task }) => {
    const [showAddTaskBar, setShowAddTaskBar] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        if (showAddTaskBar) document.getElementById(`add-task`).focus();
    }, [showAddTaskBar]);

    const handleAddClick = () => {
        setShowAddTaskBar(true);
    }

    const handleDeleteClick = () => {
        dispatch(deleteTask({ uuid: task.uuid }))
    }

    return (
        <>
            <div className="task">
                <span className="task-title">{task.title}</span>
                <input type="button" className="task-action-btn" value="+" onClick={handleAddClick} />
                <input type="button" className="task-action-btn" value="x" onClick={handleDeleteClick} />
            </div>
            {showAddTaskBar && <AddTaskBar close={() => setShowAddTaskBar(false)} />}
        </>
    )
}

const TaskList = ({ }) => {
    const tasks = useSelector(selectAllTasks);

    return (
        <div className="task-list">
            {tasks.map((each) => (
                <Task key={each.uuid} task={each} />
            ))}
        </div>
    )
}

export default TaskList;