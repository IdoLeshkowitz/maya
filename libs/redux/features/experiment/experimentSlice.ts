import {ExperimentMeta} from "@/types/experimentMeta";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PersonalDetails} from "@/types/personalDetails";
import {ObjectId} from "bson";

export enum ExperimentStep {
    "LOADING" = "LOADING",
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
    experimentId?: ObjectId
    experimentMeta: ExperimentMeta | null
    experimentStep: ExperimentStep
    startTime: number | null,
    endTime: number | null,
    personalDetails : PersonalDetails | null
}

const initialState: ExperimentState = {
    experimentMeta: null,
    experimentStep: ExperimentStep.LOADING,
    startTime     : null,
    endTime       : null,
    personalDetails : null
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
        setPersonalDetails(state, action: PayloadAction<PersonalDetails>) {
            state.personalDetails = action.payload
        },
        setExperimentId(state, action: PayloadAction<ObjectId>) {
            state.experimentId = action.payload
        }
    }
})
