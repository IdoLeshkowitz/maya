import {TaskMeta} from "@/types/taskMeta";
import {TaskResult} from "@/types/taskResult";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum TaskStep {
    IDLE,
    INSTRUCTIONS,
    PERFORMANCE,
    OPTION_SELECTION,
    GROUP_SCORING,
    FINISHED
}

export interface TaskState {
    taskMeta: TaskMeta
    taskResult: TaskResult
    taskStep: TaskStep
    startTime: number | null
    endTime: number | null
}

interface TasksState {
    allTasks: TaskState[]
    currentTaskIndex: number | null
}

const initialState: TasksState = {
    allTasks        : [],
    currentTaskIndex: null
}

export const tasksSlice = createSlice( {
    initialState,
    name    : 'tasks',
    reducers: {
        setAllTasksState(state, action: PayloadAction<TaskState[]>) {
            state.allTasks = action.payload
        },
        setTaskStepByIndex(state, action: PayloadAction<{ taskIndex: number, taskStep: TaskStep }>) {
            state.allTasks[action.payload.taskIndex].taskStep = action.payload.taskStep
        },
        setTaskResultByIndex(state, action: PayloadAction<{ taskIndex: number, taskResult: TaskResult }>) {
            state.allTasks[action.payload.taskIndex].taskResult = action.payload.taskResult
        },
        setTaskStartTimeByIndex(state, action: PayloadAction<{ taskIndex: number, startTime: number }>) {
            state.allTasks[action.payload.taskIndex].startTime = action.payload.startTime
        },
        setTaskEndTimeByIndex(state, action: PayloadAction<{ taskIndex: number, endTime: number }>) {
            state.allTasks[action.payload.taskIndex].endTime = action.payload.endTime
        },
        setCurrentTaskIndex(state, action: PayloadAction<number | null>) {
            state.currentTaskIndex = action.payload
        },
    }
})