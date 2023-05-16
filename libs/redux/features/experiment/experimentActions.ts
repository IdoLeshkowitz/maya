import {createAction} from "@reduxjs/toolkit";
import {experimentSlice} from "./experimentSlice";

export const {setExperimentMeta, setExperimentStep, setExperimentStartTime, setExperimentEndTime} = experimentSlice.actions
export const stepForward = createAction('experiment/stepForward')
