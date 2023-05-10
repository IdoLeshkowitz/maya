import {OptionSelection, Score} from "@/types/taskResult";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CurrentTaskResultState {
    optionSelection: OptionSelection | null
    scores: Score[] | null
}

const initialState: CurrentTaskResultState = {
    optionSelection: null,
    scores         : null
}

export const currentTaskResultSlice = createSlice({
    name    : 'currentTaskResult',
    initialState,
    reducers: {
        resetCurrentTaskResult(state) {
            state.optionSelection = null
            state.scores = null
        },
        setCurrentTaskScores(state, action:PayloadAction<Score[]>) {
            state.scores = action.payload
        },
        setCurrentTaskOptionSelection(state, action:PayloadAction<OptionSelection>) {
            state.optionSelection = action.payload
        },
    }
})