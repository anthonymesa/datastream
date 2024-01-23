import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    loggedIn: false,
}

const SessionManagerState = createSlice({
    name: "SessionManagerState",
    initialState: initialState,
    reducers: {
        beginSession: (state, action) => {
            state.loggedIn = true
        },
        endSession: (state, action) => {
            state.loggedIn = false
        }
    }
})

export const {
    beginSession,
    endSession
} = SessionManagerState.actions

export const LoggedInSelector = (state) => {
    return state.sessionManager.loggedIn
}

export const getUser = () => {
    return Cookies.get('session')
}

export const logIn = (token) => (dispatch, getState) => {
    Cookies.set('session', token, { expires: 7, secure: true });
    dispatch(beginSession({}))
}

export const logOut = () => (dispatch, getState) => {
    Cookies.remove('session')
    dispatch(endSession({}))
}

export default SessionManagerState.reducer