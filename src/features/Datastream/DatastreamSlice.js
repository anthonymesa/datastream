import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    actions: [
        {
            parentUuid: '',
            uuid: 'faefoijaefoijaefoija',
            title: 'A Title',
            description: 'A fancy description',
            tags: [],
            state: 'incomplete',
        },
        {
            parentUuid: '',
            uuid: 'fiojoiejfoaije',
            title: 'A Title 2',
            description: 'A fancy description',
            tags: [],
            state: 'incomplete',
        },
        {
            parentUuid: 'faefoijaefoijaefoija',
            uuid: 'alfdlifhsl',
            title: 'A Title 3',
            description: 'A fancy description',
            tags: [],
            state: 'incomplete',
        },
        {
            parentUuid: 'faefoijaefoijaefoija',
            uuid: 'fjeajfeiljfa',
            title: 'A Title 4',
            description: 'A fancy description',
            tags: [],
            state: 'incomplete',
        }
    ]
}

const DatastreamState = createSlice({
    name: "DatastreamState",
    initialState: initialState,
    reducers: {
        deleteAction: (state, action) => {
            const { uuid } = action.payload;
            state.actions = state.actions.filter((x) => x.uuid !== uuid);
        },
        setComplete: (state, action) => {
            const { uuid } = action.payload;

            const foundAction = state.actions.find((e) => e.uuid == uuid)
            if (foundAction)
                foundAction.state = "complete";
        },
        setIncomplete: (state, action) => {
            const { uuid } = action.payload;

            const foundAction = state.actions.find((e) => e.uuid == uuid)
            if (foundAction)
                foundAction.state = "incomplete";
        }
    }
})

/**
 * 
 * @param {any} state 
 * @param {string} uuid 
 * @returns {string|null}
 */
export const ActionDescriptionSelector = (state, uuid) => {
    return state.datastream.actions.find((e) => e.uuid == uuid)?.description
}

/**
 * 
 * @param {any} state 
 * @param {string} uuid 
 * @returns {string|null}
 */
export const ActionTitleSelector = (state, uuid) => {
    return state.datastream.actions.find((e) => e.uuid == uuid)?.title
}

/**
 * 
 * @param {any} state 
 * @param {string} uuid 
 * @returns {number}
 */
export const ActionProgressSelector = (state, uuid) => {
    const action = state.datastream.actions.find((e) => e.uuid == uuid);

    if (action == null) {
        return 0;
    }

    if (action.state == "complete") return 100;

    const dependentActions = state.datastream.actions.filter((e) => e.parentUuid == uuid);
    const totalDependents = dependentActions.length;
    if (totalDependents == 0) {
        return action.state == "complete" ? 100 : 0;
    }


    const completedDependents = dependentActions.reduce((acc, action) => (
        action.state == "complete" ? acc + 1 : acc
    ), 0)

    const completion = Math.floor(100 * (completedDependents / totalDependents));

    return completion;
}

export const ActionsSelector = (state) => {
    return state.datastream.actions;
}

function getDependentActions(state, parentUuid) {
    const dependents = state.actions.filter((e) => e.parentUuid == parentUuid);
    return dependents;
}

export const DependentActionsSelector = (state, parentUuid) => {
    return getDependentActions(state.datastream, parentUuid);
}

export const ActionCompleteSelector = (state, uuid) => {
    return state.datastream.actions.find((e) => e.uuid == uuid).state == "complete" || ActionProgressSelector(state, uuid) == 100;
}

export const {
    deleteAction,
    setComplete,
    setIncomplete,
} = DatastreamState.actions;

export default DatastreamState.reducer;