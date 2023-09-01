
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../taskList/taskListSlice";

const AddTaskBar = ({ }) => {
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
        <div>
            <input type="text" placeholder="enter task name..." value={inputValue} onKeyUp={handleKeyUp} onChange={handleChange} />
            <input type="button" value="+" onClick={handleClick} disabled={inputValue.length == 0} />
        </div>
    )
}

export default AddTaskBar;