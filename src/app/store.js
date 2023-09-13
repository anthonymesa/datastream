
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import DatastreamSlice from "../features/Datastream/DatastreamSlice";

const store = configureStore({
    reducer: {
        datastream: DatastreamSlice,
    },
})

export default store;