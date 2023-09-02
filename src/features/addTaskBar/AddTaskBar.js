
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../taskList/taskListSlice";
import './AddTaskBar.css'

const AddTaskBar = ({ close, parentId }) => {
    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch()

    const handleChange = (event) => {
        setInputValue(event.target.value);
    }

    const addTaskCb = useCallback(() => {
        dispatch(addTask({ title: inputValue, parentId: parentId }));
        setInputValue('');
        close();
    }, [inputValue]);

    const handleClick = (event) => addTaskCb();

    const handleKeyUp = (event) => {
        switch(event.key) {
            case 'Enter': {
                addTaskCb();
                break;
            }
            case 'Escape': {
                close();
                break;
            }
        }
    }

    const handleOnBlur = () => close();

    return (
        <div className="add-bar">
            <input type="text" className="input-title" id={`add-task`} placeholder="enter task name..." value={inputValue} onKeyUp={handleKeyUp} onBlur={handleOnBlur} onChange={handleChange} />
            <input type="button" className="btn-add" value="ok" onClick={handleClick} disabled={inputValue.length === 0} />
        </div>
    )
}

export default AddTaskBar;