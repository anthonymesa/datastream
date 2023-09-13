import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    opened: false,
    form: {
        parentId: '',
        title: '',
        description: '',
        tags: [],
        state: 'incomplete',
    }
}

const ModalActionAddState = createSlice({
    name: "ModalActionAddState",
    initialState: initialState,
    reducers: {
        open: (state, action) => {
            state.opened = true;
        },
        close: (state, action) => {
            state.opened = false;
        },
        setParentId: (state, action) => {
            const { value } = action.payload;
            state.form.parentId = value;
        },
        setTitle: (state, action) => {
            const { value } = action.payload;
            state.form.title = value;
        },
        setDescription: (state, action) => {
            const { value } = action.payload;
            state.form.description = value;
        },
        setTags: (state, action) => {
            const { list } = action.payload;
            state.form.tags = list;
        },
        setActionState: (state, action) => {
            const { value } = action.payload;
            state.form.state = value;
        }
    }
})

export const formSelector = (state) => {
    return state.ui.modals.actionAdd.form;
}

export const {
    open,
    close,
    setParentId,
    setTitle,
    setDescription,
    setTags,
    setActionState,
} = ModalActionAddState.actions;

export default ModalActionAddState.reducer;