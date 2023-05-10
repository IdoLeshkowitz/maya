import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface TaskAnalyticsState {
    startTime: number | null
    endTime: number | null
}

const initialState: TaskAnalyticsState = {
    startTime: null,
    endTime  : null
}

export const currentTaskAnalyticsSlice = createSlice({
    initialState,
    name    : 'taskAnalytics',
    reducers: {
        setStartTime(state, action: PayloadAction<number>) {
            state.startTime = action.payload
        },
        setEndTime(state, action: PayloadAction<number>) {
            state.endTime = action.payload
        },
        resetCurrentTaskAnalytics(state) {
            state.startTime = null
            state.endTime = null
        }
    }
})
