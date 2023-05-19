import {TaskResult} from "@/types/taskResult";
import {Middleware} from "redux";
import {PayloadAction} from "@reduxjs/toolkit";
import {
    fetchExperimentMetaSuccess,
    fetchTaskMetaSuccess,
    submitTasksResult,
    submitTasksResultFailure,
    submitTasksResultSuccess
} from "./apiActions";
import {setExperimentMeta, setExperimentStep} from "../experiment/experimentActions";
import {ExperimentStep} from "../experiment/experimentSlice";
import {RootState} from "../../store";
import {TaskMeta} from "@/types/taskMeta";
import {TaskState, TaskStep} from "../tasks/tasksSlice";
import {setAllTasksState} from "../tasks/tasksActions";
import {ExperimentMeta} from "@/types/experimentMeta";

export const submitTasksResultM: Middleware = ({dispatch, getState}) => (next) => async (action: PayloadAction<TaskResult[]>) => {
    next(action)
    if (action.type === submitTasksResult.type) {
        /* set experiment step */
        dispatch(setExperimentStep(ExperimentStep.RESULTS_SENT))
        /* extract tasks results from state*/
        const {tasks: {tasksStates}}: RootState = getState()
        const taskResults = tasksStates.map(task => task.taskResult)
        /* send results to server */
        const res = await fetch("/api/taskResults", {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body   : JSON.stringify(taskResults)
        })
        if (!res.ok) {
            dispatch(submitTasksResultFailure())
            return
        }
        dispatch(submitTasksResultSuccess())
    }
}
export const submitTasksResultSuccessM: Middleware = ({dispatch, getState}) => (next) => (action) => {
    next(action)
    if (action.type === submitTasksResultSuccess.type) {
        /* set experiment step */
        dispatch(setExperimentStep(ExperimentStep.ENDED_SUCCESS))
    }
}
export const submitTasksResultFailureM: Middleware = ({dispatch, getState}) => (next) => (action) => {
    next(action)
    if (action.type === submitTasksResultFailure.type) {
        /* set experiment step */
        dispatch(setExperimentStep(ExperimentStep.ENDED_ERROR))
    }
}
export const fetchTaskMetaSuccessM: Middleware = ({dispatch, getState}) => (next) => (action: PayloadAction<TaskMeta[]>) => {
    next(action)
    if (action.type === fetchTaskMetaSuccess.type) {
        /* check if experiment is in progress */
        const {experiment: {experimentStep}}: RootState = getState()
        if (experimentStep !== ExperimentStep.IDLE) {
            /* if in progress, do nothing */
            return
        }
        /* if not in progress initialize tasks state with taskMeta */
        const tasksStateToAdd: TaskState[] = action.payload.map(taskMeta => ({
            taskMeta,
            taskStep  : TaskStep.IDLE,
            taskResult: {
                taskId: taskMeta._id!,
            },
            endTime   : null,
            startTime : null,
            currentSnapshotIndex: null
        }))
        dispatch(setAllTasksState(tasksStateToAdd))
    }
}
export const fetchExperimentMetaSuccessM: Middleware = ({dispatch, getState}) => (next) => (action: PayloadAction<ExperimentMeta>) => {
    next(action)
    if (action.type === fetchExperimentMetaSuccess.type) {
        /* check if experiment is in progress */
        const {experiment: {experimentStep}}: RootState = getState()
        if (experimentStep !== ExperimentStep.IDLE) {
            /* if in progress, do nothing */
            return
        }
        /* if not in progress set experimentMeta */
        dispatch(setExperimentMeta(action.payload))
    }
}
export const apiMiddleware = [submitTasksResultM, submitTasksResultSuccessM, submitTasksResultFailureM, fetchTaskMetaSuccessM, fetchExperimentMetaSuccessM]