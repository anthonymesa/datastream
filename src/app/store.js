
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import DatastreamSlice from "../features/Datastream/DatastreamSlice";

import ModalActionAddSlice from "../features/ModalActionAdd/ModalActionAddSlice"

import ModalActionEditSlice from '../features/ModalActionEdit/ModalActionEditSlice'

const store = configureStore({
    reducer: {
        datastream: DatastreamSlice,
        ui: combineReducers({
          modals: combineReducers({
            actionAdd: ModalActionAddSlice,
            actionEdit: ModalActionEditSlice
          })
        })
    },
})

export default store;