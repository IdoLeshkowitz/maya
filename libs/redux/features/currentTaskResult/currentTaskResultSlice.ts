import {OptionSelection, Score} from "@/types/taskResult";
import {createSlice} from "@reduxjs/toolkit";

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
        setOptionSelection(state, action) {
            state.optionSelection = action.payload
        },
        setScores(state, action) {
            state.scores = action.payload
        }
    }
})