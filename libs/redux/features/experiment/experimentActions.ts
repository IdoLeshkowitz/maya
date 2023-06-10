import {createAction} from "@reduxjs/toolkit";
import {experimentSlice} from "./experimentSlice";
import {Experiment} from "@/types/experiment";
import {ExperimentMeta} from "@/types/experimentMeta";
import {TaskMeta} from "@/types/taskMeta";

export const {setExperimentMeta, setExperimentStep, setExperimentStartTime, setExperimentEndTime,setPersonalDetails,setExperimentId} = experimentSlice.actions
export const stepForward = createAction('experiment/stepForward')
export const initializeExperiment = createAction<{experiment : Experiment,experimentMeta: ExperimentMeta, tasksMeta: TaskMeta[]}>('experiment/initializeExperiment')