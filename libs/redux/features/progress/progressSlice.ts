import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum TaskStatus {
    "LEFT_PREVIEW",
    "RIGHT_PREVIEW",
    "OPTION_SELECTION",
    "LEFT_SCORES",
    "RIGHT_SCORES",
    "FINISHED"
}

export enum ExperimentStatus {
    IDLE,
    INSTRUCTIONS,
    TASKS,
    RESULTS_PENDING,
    ENDED
}

export interface ProgressState {
    currentTaskIndex: number | null,
    currentTaskStatus: TaskStatus | null
    experimentStatus: ExperimentStatus
}

const initialState: ProgressState = {
    currentTaskIndex : null,
    currentTaskStatus: null,
    experimentStatus : ExperimentStatus.IDLE
}

export const progressSlice = createSlice({
    initialState,
    name    : 'progress',
    reducers: {
        setCurrentTaskIndex(state, action: PayloadAction<number>) {
            state.currentTaskIndex = action.payload
        },
        setCurrentTaskStatus(state, action: PayloadAction<TaskStatus>) {
            state.currentTaskStatus = action.payload
        },
        setExperimentStatus(state, action: PayloadAction<ExperimentStatus>) {
            state.experimentStatus = action.payload
        },
    }
})