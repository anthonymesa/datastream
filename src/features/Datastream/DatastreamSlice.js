import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

export const ACTION_STATE = {
    PAUSED: 'paused',
    INCOMPLETE: 'incomplete',
    COMPLETE: 'complete',
}

const initialState = {
    actions: [],
    activeAction: '',
    name: 'datastream'
}

const DatastreamState = createSlice({
    name: "DatastreamState",
    initialState: initialState,
    reducers: {
        addAction: (state, action) => {
            const { newAction } = action.payload
            newAction["uuid"] = uuidv4()
            state.actions.push(newAction)
        },
        updateAction: (state, action) => {
            const { uuid, data } = action.payload;

            const actionIndex = state.actions.findIndex((e) => e.uuid == uuid);

            if (actionIndex != -1) {
                state.actions[actionIndex] = data;
            }

            state.actions[actionIndex]["uuid"] = uuid
        },
        deleteAction: (state, action) => {
            const { uuid } = action.payload;
            state.actions = state.actions.filter((x) => x.uuid !== uuid);
        },
        cycleState: (state, action) => {
            const { uuid } = action.payload;
            const currentAction = state.actions.find((e) => e.uuid == uuid);

            const setNextState = (state, progress) => {
                switch (state) {
                    case ACTION_STATE.PAUSED:
                        return progress == 100 ? ACTION_STATE.COMPLETE : ACTION_STATE.INCOMPLETE;
                    case ACTION_STATE.INCOMPLETE:
                        return ACTION_STATE.COMPLETE;
                    case ACTION_STATE.COMPLETE:
                        // If the progress is 100, then switch to PAUSED. Otherwise, cycle to INCOMPLETE.
                        return progress == 100 ? ACTION_STATE.PAUSED : ACTION_STATE.INCOMPLETE;
                }
            }

            // Calculate the progress for the current action
            const progress = getActionProgress(state, uuid);

            currentAction.state = setNextState(currentAction.state, progress);
        },
        updateParentState: (state, action) => {
            const { parentUuid } = action.payload;
            if (!parentUuid) return;

            const dependentActions = state.actions.filter(e => e.parentUuid == parentUuid);
            const actionableDependents = dependentActions.filter(e => e.state !== ACTION_STATE.PAUSED);

            // If there are no actionable dependents, don't change the parent's state.
            if (actionableDependents.length === 0) return;

            if (actionableDependents.every(e => e.state == ACTION_STATE.COMPLETE)) {
                const parentAction = state.actions.find(e => e.uuid == parentUuid);
                parentAction.state = ACTION_STATE.COMPLETE;
            } else if (actionableDependents.some(e => e.state == ACTION_STATE.INCOMPLETE)) {
                const parentAction = state.actions.find(e => e.uuid == parentUuid);
                parentAction.state = ACTION_STATE.INCOMPLETE;
            }
        },
        setState: (state, action) => {
            const { uuid, newState } = action.payload;
            const currentAction = state.actions.find((e) => e.uuid == uuid)
            currentAction.state = newState;
        },
        setActiveAction: (state, action) => {
            const { uuid } = action.payload;
            state.activeAction = uuid;
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

function getActionProgress(state, uuid) {
    const action = state.actions.find((e) => e.uuid == uuid);

    if (action == null) {
        return 0;
    }

    const dependentActions = state.actions.filter((e) => e.parentUuid == uuid && (e.state == ACTION_STATE.COMPLETE || e.state == ACTION_STATE.INCOMPLETE));
    const totalDependents = dependentActions.length;
    if (totalDependents == 0) {
        return action.state == ACTION_STATE.COMPLETE ? 100 : 0;
    }

    const completedDependents = dependentActions.reduce((acc, action) => (
        action.state == ACTION_STATE.COMPLETE ? acc + 1 : acc
    ), 0)

    const completion = Math.floor(100 * (completedDependents / totalDependents));

    return completion;
}

export const ActionProgressSelector = (state, uuid) => {
    return getActionProgress(state.datastream, uuid);
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

export const ActionStateSelector = (state, uuid) => {
    return state.datastream.actions.find((e) => e.uuid == uuid).state;
}

export const ActionActiveSelector = (state) => {
    return state.datastream.activeAction;
}

export const DatastreamRatioSelector = (state, id) => {
    return {
        n: state.datastream.actions.filter((e) => e.parentUuid == id && e.state == ACTION_STATE.COMPLETE).length,
        d: state.datastream.actions.filter((e) => e.parentUuid == id && e.state !== ACTION_STATE.PAUSED).length
    }
}

export const actionTitlesSelector = (state) => {
    const actionsList = state.datastream.actions.map((e) => ({
        label: e.title,
        value: e.uuid
    }))

    actionsList.push({
        label: "Datastream",
        value: '',
    })

    return actionsList
}

export const actionSelector = (state, uuid) => {
    return state.datastream.actions.find((e) => e.uuid == uuid)
}

export const {
    updateAction,
    addAction,
    deleteAction,
    cycleState,
    updateParentState,
    setState,
    setActiveAction
} = DatastreamState.actions;

const updateAllParentStates = (uuid) => (dispatch, getState) => {
    let currentAction = getState().datastream.actions.find(e => e.uuid == uuid);
    while (currentAction && currentAction.parentUuid) {
        dispatch(updateParentState({ parentUuid: currentAction.parentUuid }));
        currentAction = getState().datastream.actions.find(e => e.uuid == currentAction.parentUuid);
    }
};

export const toggleAndCheckParent = (uuid) => (dispatch, getState) => {
    dispatch(cycleState({ uuid }));
    dispatch(updateAllParentStates(uuid));
};

export default DatastreamState.reducer;