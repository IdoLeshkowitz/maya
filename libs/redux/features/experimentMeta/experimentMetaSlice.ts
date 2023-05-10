import {ExperimentMeta} from "@/types/experimentMeta";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type ExperimentMetaState = ExperimentMeta | null;
const initialState: ExperimentMetaState = null;
export const experimentMetaSlice = createSlice({
    name        : 'experimentMeta',
    initialState: initialState as ExperimentMetaState,
    reducers    : {
        setExperimentMeta: (state, action: PayloadAction<ExperimentMeta>) => {
            return action.payload;
        }
    }
})
