
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

            state.tasks.push({
                uuid: uuidv4(),
                parentId: parentId,
                title: title,
                descendants: [],
            });
        },
        deleteTask: (state, action) => {
            const { uuid } = action.payload;

            state.tasks = state.tasks.filter((each) => each.uuid != uuid);
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