
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import DatastreamSlice from "../features/Datastream/DatastreamSlice";

import ModalActionAddSlice from "../features/ModalActionAdd/ModalActionAddSlice"

const store = configureStore({
    reducer: {
        datastream: DatastreamSlice,
        ui: combineReducers({
          modals: combineReducers({
            actionAdd: ModalActionAddSlice
          })
        })
    },
})

export default store;