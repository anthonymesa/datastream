
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, selectAllTasks } from "./taskListSlice"
import './Task.css'

const Task = ({ task }) => {

    const dispatch = useDispatch()

    const handleAddClick = () => {

    }

    const handleDeleteClick = () => {
        dispatch(deleteTask({ uuid: task.uuid }))
    }

    return (
        <div className="task">
            <span className="task-title">{task.title}</span>
            <input type="button" className="task-add-btn" value="+" onClick={handleAddClick} />
            <input type="button" className="task-add-btn" value="x" onClick={handleDeleteClick} />
        </div>
    )
}

const TaskList = ({ }) => {
    const tasks = useSelector(selectAllTasks);

    return (
        <div>
            {tasks.map((each) => (
                <Task key={each.uuid} task={each} />
            ))}
        </div>
    )
}

export default TaskList;