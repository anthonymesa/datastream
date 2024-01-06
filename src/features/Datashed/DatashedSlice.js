import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const defaultDatastream = {
    uuid: '',
    name: '',
    description: '',
    actions: [],
}

const initialState = {
    datastreams: [
        {
            uuid: 'datastream1',
            name: 'Datastream 1',
            description: 'A first test',
            actions: ['action1'],
        },
        {
            uuid: 'datastream2',
            name: 'Datastream 2',
            description: 'A second test',
            actions: ['action2'],
        },
        {
            uuid: 'datastream3',
            name: 'Datastream 3',
            description: 'A third test',
            actions: ['action3'],
        }
    ]
}

const Datashed = createSlice({
    name: 'Datashed',
    initialState: initialState,
    reducers: {
        addDatastream: (state, action) => {
            const { name, description } = action.payload
            const uuid = uuidv4();
            state.datastreams.push({
                ...defaultDatastream,
                uuid,
                name,
                description
            })
        },
        deleteDatastream: (state, action) => {
            const { uuid } = action.payload
            state.datastreams = state.datastreams.filter(each => each.uuid != uuid);
        },
        updateDatastream: (state, action) => {
            const { uuid, name, description } = action.payload

            state.datastreams = getUpdatedDatastreams({uuid, update: {name, description}})
        },
        addDatastreamAction: (state, action) => {
            const { uuid, action_uuid } = action.payload
            const actions = state.datastreams.find(each => each.uuid == uuid).actions
            actions.push(action_uuid)
            state.datastreams = getUpdatedDatastreams({uuid, update: {actions}})
        },
        deleteDatastreamAction: (state, action) => {
            const { uuid, action_uuid } = action.payload
            const actions = state.datastreams.find(each => each.uuid == uuid).actions
            if(actions.find(each => each.uuid == action_uuid).length > 0) return
            state.datastreams = getUpdatedDatastreams({uuid, update: {actions: actions.filter(each => each.uuid != action_uuid)}})
        }
    }
})

export const datastreamsSelector = (state) => {
    return state.datashed.datastreams
}

export const actionNamesSelector = (state, uuid) => {
    const stream = state.datashed.datastreams.find(each => each.uuid == uuid)
    return stream ? stream.actions : []
}

function getUpdatedDatastreams(state, {uuid, update}) {
    const { name, description, actions } = update
    return state.datastreams.map(each => each.uuid == uuid ? 
        {
            ...each,
            name: name ? name : each.name,
            description: description ? description : each.description,
            actions: actions ? actions : each.actions
        }
        : each)
}

export const {
    addDatastream,
    deleteDatastream,
    updateDatastream
} = Datashed.actions

export default Datashed.reducer