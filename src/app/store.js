
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import DatastreamSlice from "../features/Datastream/DatastreamSlice";
import ModalActionAddSlice from "../features/ModalActionAdd/ModalActionAddSlice"
import ModalActionEditSlice from '../features/ModalActionEdit/ModalActionEditSlice'
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import DatashedSlice from "../features/Datashed/DatashedSlice";

const persistConfig = {
  key: "enigma-store",
  storage
}

const baseReducer = combineReducers({
  datastream: DatastreamSlice,
  datashed: DatashedSlice,
  ui: combineReducers({
    modals: combineReducers({
      actionAdd: ModalActionAddSlice,
      actionEdit: ModalActionEditSlice
    })
  })
})

const persistedReducer = persistReducer(persistConfig, baseReducer)

const store = configureStore({
  reducer: persistedReducer
})

const persistor = persistStore(store)

export default store;
export { persistor }