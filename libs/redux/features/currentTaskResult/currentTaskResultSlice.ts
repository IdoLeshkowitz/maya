import {OptionSelection, Score} from "@/types/taskResult";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface CurrentTaskResultState {
    optionSelection: OptionSelection | null
    leftScores: Score[] | null
    rightScores: Score[] | null
}

const initialState: CurrentTaskResultState = {
    optionSelection: null,
    leftScores     : null,
    rightScores    : null,
}

export const currentTaskResultSlice = createSlice({
    name    : 'currentTaskResult',
    initialState,
    reducers: {
        addCurrentTaskLeftScore(state, action: PayloadAction<Score>) {
            if (!state.leftScores) state.leftScores = []
            state.leftScores.push(action.payload)
        },
        addCurrentTaskRightScore(state, action: PayloadAction<Score>) {
            if (!state.rightScores) state.rightScores = []
            state.rightScores.push(action.payload)
        },
        resetCurrentTaskResult(state) {
            state.leftScores = null
            state.rightScores = null
            state.optionSelection = null
        },
        setCurrentTaskOptionSelection(state, action: PayloadAction<OptionSelection>) {
            state.optionSelection = action.payload
        },
    }
})