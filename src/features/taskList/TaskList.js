
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteTask, selectAllTasks } from "./taskListSlice"
import './TaskList.css'
import AddTaskBar from "../addTaskBar/AddTaskBar"
import { Accordion, ActionIcon, AccordionControlProps, Box } from '@mantine/core';
import { MdAddCircle, MdRemoveCircle, MdCheck } from "react-icons/md"

function TaskList({ parentId = '' }) {
    const tasks = useSelector(selectAllTasks);

    console.log(JSON.stringify(tasks, null, 2));

    const [showAddTaskBar, setShowAddTaskBar] = useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        if (showAddTaskBar) document.getElementById(`add-task`).focus();
    }, [showAddTaskBar]);

    const handleAddClick = () => {
        setShowAddTaskBar(true);
    }

    const handleDeleteClick = (uuid) => {
        dispatch(deleteTask({ uuid: uuid }))
    }

    const handleCompleteClick = () => {

    }

    function AccordionPanel(props) {
        return (
            <>
                <TaskList parentId={props.task.uuid} />
                {showAddTaskBar && <AddTaskBar parentId={props.task.uuid} close={() => setShowAddTaskBar(false)} />}
            </>
        )
    }

    function AccordionControl(props) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Accordion.Control {...props} />
                <ActionIcon onClick={handleAddClick}><MdAddCircle /></ActionIcon>
                <ActionIcon onClick={() => handleDeleteClick(props.task.uuid)}><MdRemoveCircle /></ActionIcon>
                <ActionIcon onClick={handleCompleteClick}><MdCheck /></ActionIcon>
            </Box>
        );
    }

    return (
        <div className={/*`/*task-list ${parentId != '' ? "nested" : ''}`*/""}>
            <Accordion chevronPosition="left" variant="contained" defaultValue="" maw="400">
                {tasks.filter((i) => i.parentId == parentId).map((each) => (
                    <Accordion.Item value={each.uuid}>
                        <AccordionControl task={each}>{each.title}</AccordionControl>
                        <Accordion.Panel>
                            <AccordionPanel task={each} />
                        </Accordion.Panel>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    )
}

export default TaskList;
