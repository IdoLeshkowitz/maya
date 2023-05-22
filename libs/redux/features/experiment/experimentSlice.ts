import {ExperimentMeta} from "@/types/experimentMeta";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum ExperimentStep {
    IDLE = "IDLE",
    CONSENT = "CONSENT",
    INTRO = "INTRO",
    TASKS = "TASKS",
    FORM = "FORM",
    RESULTS_SENT = "RESULTS_SENT",
    ENDED_SUCCESS = "ENDED_SUCCESS",
    ENDED_ERROR = "ENDED_ERROR",

}

interface ExperimentState {
    experimentMeta: ExperimentMeta | null
    experimentStep: ExperimentStep
    startTime: number | null,
    endTime: number | null,
}

const initialState: ExperimentState = {
    experimentMeta: null,
    experimentStep: ExperimentStep.IDLE,
    startTime     : null,
    endTime       : null,
}

export const experimentSlice = createSlice({
    initialState,
    name    : 'experiment',
    reducers: {
        setExperimentMeta(state, action: PayloadAction<ExperimentMeta>) {
            state.experimentMeta = action.payload
        },
        setExperimentStep(state, action: PayloadAction<ExperimentStep>) {
            state.experimentStep = action.payload
        },
        setExperimentStartTime(state, action: PayloadAction<number>) {
            state.startTime = action.payload
        },
        setExperimentEndTime(state, action: PayloadAction<number>) {
            state.endTime = action.payload
        },
    }
})
