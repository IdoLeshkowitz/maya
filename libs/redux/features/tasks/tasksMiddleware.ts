import {Middleware} from "redux";
import {PayloadAction} from "@reduxjs/toolkit";
import {
    setCurrentTaskEndTime,
    setCurrentTaskResultLeftScores,
    setCurrentTaskResultOptionSelection,
    setCurrentTaskResultRightScores,
    setCurrentTaskStartTime,
    setCurrentTaskStep,
    setTaskEndTimeByIndex,
    setTaskResultByIndex,
    setTaskStartTimeByIndex,
    setTaskStepByIndex
} from "./tasksActions";
import {RootState} from "../../store";
import {OptionSelection, TaskResult} from "@/types/taskResult";

const setCurrentTaskStepM: Middleware = ({dispatch, getState}) => (next) => (action: PayloadAction<number>) => {
    next(action)
    if (action.type === setCurrentTaskStep.type) {
        /* set current task step to  */
        dispatch(setTaskStepByIndex({taskIndex: getState().tasks.currentTaskIndex!, taskStep: action.payload}))
    }
}
const setCurrentTaskStartTimeM: Middleware = ({dispatch, getState}) => (next) => (action: PayloadAction<number>) => {
    next(action)
    if (action.type === setCurrentTaskStartTime.type) {
        /* get the current task index */
        const state: RootState = getState()
        const currentTaskIndex = state.tasks.currentTaskIndex!
        /* dispatch set task step */
        dispatch(setTaskStartTimeByIndex({taskIndex: currentTaskIndex, startTime: action.payload}))
    }
}
const setCurrentTaskEndTimeM: Middleware = ({dispatch, getState}) => (next) => (action: PayloadAction<number>) => {
    next(action)
    if (action.type === setCurrentTaskEndTime.type) {
        /* get the current task index */
        const state: RootState = getState()
        const currentTaskIndex = state.tasks.currentTaskIndex!
        /* dispatch set task step */
        dispatch(setTaskEndTimeByIndex({taskIndex: currentTaskIndex, endTime: action.payload}))
    }
}

const setCurrentTaskResultOptionSelectionM: Middleware = ({dispatch, getState}) => (next) => (action: PayloadAction<OptionSelection>) => {
    next(action)
    if (action.type === setCurrentTaskResultOptionSelection.type) {
        /* get current task result */
        const state: RootState = getState()
        const currentTaskIndex = state.tasks.currentTaskIndex!
        const currentTaskResult = state.tasks.allTasks[currentTaskIndex].taskResult!
        const updatedTaskResult: TaskResult = {
            ...currentTaskResult,
            optionSelection: action.payload
        }
        /* dispatch set task result */
        dispatch(setTaskResultByIndex({taskIndex: currentTaskIndex, taskResult: updatedTaskResult}))
    }
}
const setCurrenTaskResultLeftScoresM: Middleware = ({dispatch, getState}) => (next) => (action: PayloadAction<number[]>) => {
    next(action)
    if (action.type === setCurrentTaskResultLeftScores.type) {
        /* get current task result */
        const state: RootState = getState()
        const currentTaskIndex = state.tasks.currentTaskIndex!
        const currentTaskResult = state.tasks.allTasks[currentTaskIndex].taskResult
        const updatedTaskResult: TaskResult = {
            ...currentTaskResult,
            leftScores: action.payload
        }
        /* dispatch set task result */
        dispatch(setTaskResultByIndex({taskIndex: currentTaskIndex, taskResult: updatedTaskResult}))
    }
}
const setCurrenTaskResultRightScoresM: Middleware = ({dispatch, getState}) => (next) => (action: PayloadAction<number[]>) => {
    next(action)
    if (action.type === setCurrentTaskResultRightScores.type) {
        /* get current task result */
        const state: RootState = getState()
        const currentTaskIndex = state.tasks.currentTaskIndex!
        const currentTaskResult = state.tasks.allTasks[currentTaskIndex].taskResult
        const updatedTaskResult: TaskResult = {
            ...currentTaskResult,
            rightScores: action.payload
        }
        /* dispatch set task result */
        dispatch(setTaskResultByIndex({taskIndex: currentTaskIndex, taskResult: updatedTaskResult}))
    }
}
export const tasksMiddleware = [setCurrentTaskStepM, setCurrentTaskResultOptionSelectionM, setCurrenTaskResultLeftScoresM, setCurrenTaskResultRightScoresM, setCurrentTaskStartTimeM, setCurrentTaskEndTimeM]