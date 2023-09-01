
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../taskList/taskListSlice";
import './AddTaskBar.css'

const AddTaskBar = ({ close }) => {
    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch()

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const addTaskCb = useCallback(() => {
        dispatch(addTask({ title: inputValue }));
        setInputValue('');
        close();
    }, [inputValue]);

    const handleClick = (event) => addTaskCb();

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            addTaskCb();
        }
    }

    return (
        <div className="add-bar">
            <input type="text" className="input-title" id={`add-task`} placeholder="enter task name..." value={inputValue} onKeyUp={handleKeyUp} onChange={handleChange} />
            <input type="button" className="btn-add" value="ok" onClick={handleClick} disabled={inputValue.length === 0} />
        </div>
    )
}

export default AddTaskBar;