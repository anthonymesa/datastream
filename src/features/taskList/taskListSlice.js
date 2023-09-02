
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const taskListSlice = createSlice({
    name: 'taskList',
    initialState: {
        tasks: [],
    },
    reducers: {
        addTask: (state, action) => {
            const {
                title = "Default Title",
                parentId = "",
            } = action.payload;

            const uuid = uuidv4()

            // Add new task to list.
            state.tasks.push({
                uuid: uuid,
                parentId: parentId,
                title: title,
                descendants: [],
            });

            // Add the new task's uuid to its parent task's descendants.
            state.tasks.find((t) => t.uuid == parentId)?.descendants.push(uuid)
        },
        deleteTask: (state, action) => {
            const { uuid } = action.payload;

            const recursivelyDelete = (uuid) => {
                // Find the task by uuid
                const task = state.tasks.find(task => task.uuid === uuid);
                if (!task) return; // If task doesn't exist, just return
        
                // Delete its descendants first
                task.descendants.forEach(descendantUuid => recursivelyDelete(descendantUuid));
        
                // Delete the task itself
                state.tasks = state.tasks.filter(task => task.uuid !== uuid);
            }

            let task = state.tasks.find((t) => t.descendants.some((u) => u == uuid));
            if (task) {
                task.descendants = task.descendants.filter((u) => u != uuid);
            }
                    
            recursivelyDelete(uuid);
        }
    }
});

export const selectAllTasks = (store) => {
    return store.taskList.tasks;
};

export const selectTaskWithUuid = (store, uuid) => {
    return store.taskList.tasks.filter((each) => each.uuid == uuid);
};

export const { addTask, deleteTask } = taskListSlice.actions;
export default taskListSlice.reducer;