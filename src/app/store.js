
import { configureStore } from "@reduxjs/toolkit";
import taskListReducer from "../features/taskList/taskListSlice";

const store = configureStore({
    reducer: {
        taskList: taskListReducer,
    }
});

export default store;