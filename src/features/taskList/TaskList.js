
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, selectAllTasks } from "./taskListSlice"
import './TaskList.css'
import AddTaskBar from "../addTaskBar/AddTaskBar"

function Task({ task }) {
    const [showAddTaskBar, setShowAddTaskBar] = useState(false);
    const [tasksExpanded, setTasksExpanded] = useState(false);
    const [showTaskList, setShowTaskList] = useState(false);

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

    const handleBgClick = (event) => {
        if(!event.target.className.split(' ').some((s) => s == 'task-action-btn')) 
          setTasksExpanded(!tasksExpanded)
    }

    const handleCompleteClick = () => {

    }
    
    useEffect(() => {
      task.descendants.length != 0 ? setShowTaskList(true) : setShowTaskList(false)
    }, [task.descendants])

    return (
        <>
            <div className="task" onClick={handleBgClick}>
                {showTaskList && 
                  <span className={`drop-arrow ${tasksExpanded ? 'rotated' : ''}`}>{'>'}</span>
                }
                <span className="task-title">{task.title}</span>
                <input type="button" className="task-action-btn" value="✚" onClick={handleAddClick} />
                <input type="button" className="task-action-btn" value="✖" onClick={handleDeleteClick} />
                <input type="button" className="task-action-btn" value="✔" onClick={handleCompleteClick} />
            </div>
            {showAddTaskBar && <AddTaskBar parentId={task.uuid} close={() => setShowAddTaskBar(false)} />}
            {tasksExpanded && showTaskList && <TaskList parentId={task.uuid}/>}
        </>
    )
}

function TaskList({ parentId = '' }) {
    const tasks = useSelector(selectAllTasks);

    return (
        <div className={`task-list ${parentId != '' ? "nested" : ''}`}>
            {tasks.filter((i) => i.parentId == parentId).map((each) => (
                <Task key={each.uuid} task={each} />
            ))}
        </div>
    )
}

export default TaskList;