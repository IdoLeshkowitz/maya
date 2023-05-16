import {createAction} from "@reduxjs/toolkit";
import {TaskMeta} from "@/types/taskMeta";
import {TaskResult} from "@/types/taskResult";
import {ExperimentMeta} from "@/types/experimentMeta";

export const submitTasksResult = createAction<TaskResult[]>('api/submitTasksResult')
export const submitTasksResultSuccess = createAction('api/submitTasksResultSuccess')
export const submitTasksResultFailure = createAction('api/submitTasksResultFailure')

export const fetchTaskMetaSuccess = createAction<TaskMeta[]>('api/taskMetaSuccess')
export const fetchExperimentMetaSuccess = createAction<ExperimentMeta>('api/experimentMetaSuccess')