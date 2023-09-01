
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../taskList/taskListSlice";
import './QuickAddTaskBar.css'

const QuickAddTaskBar = ({ }) => {
    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch()

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleClick = (event) => {
        dispatch(addTask({ title: inputValue }));
        setInputValue('');
    }

    const handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            dispatch(addTask({ title: inputValue }));
            setInputValue('');
        }
    }

    return (
        <div className="quick-add-bar">
            <input type="text" className="quick-input-title" placeholder="enter task title..." value={inputValue} onKeyUp={handleKeyUp} onChange={handleChange} />
            <input type="button" className="quick-btn-add" value="Add" onClick={handleClick} disabled={inputValue.length === 0} />
        </div>
    )
}

export default QuickAddTaskBar;