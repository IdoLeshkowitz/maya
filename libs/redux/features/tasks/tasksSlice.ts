import {TaskMeta} from "@/types/taskMeta";
import {TaskResult} from "@/types/taskResult";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum TaskStep {
    IDLE="IDLE",
    TASK_INSTRUCTIONS="TASK_INSTRUCTIONS",
    PERFORMANCE="PERFORMANCE",
    OPTION_SELECTION="OPTION_SELECTION",
    GROUP_SCORING="GROUP_SCORING",
    FINISHED="FINISHED"
}

export interface TaskState {
    taskMeta: TaskMeta
    taskResult: TaskResult
    taskStep: TaskStep
    startTime: number | null
    endTime: number | null
    currentSnapshotIndex: number | null
}

interface TasksState {
    tasksStates: TaskState[]
    currentTaskIndex: number | null
}

const initialState: TasksState = {
    tasksStates     : [],
    currentTaskIndex: null
}

export const tasksSlice = createSlice({
    initialState,
    name    : 'tasks',
    reducers: {
        setAllTasksState(state, action: PayloadAction<TaskState[]>) {
            state.tasksStates = action.payload
        },
        setTaskStepByIndex(state, action: PayloadAction<{ taskIndex: number, taskStep: TaskStep }>) {
            state.tasksStates[action.payload.taskIndex].taskStep = action.payload.taskStep
        },
        setTaskResultByIndex(state, action: PayloadAction<{ taskIndex: number, taskResult: TaskResult }>) {
            state.tasksStates[action.payload.taskIndex].taskResult = action.payload.taskResult
        },
        setTaskStartTimeByIndex(state, action: PayloadAction<{ taskIndex: number, startTime: number }>) {
            state.tasksStates[action.payload.taskIndex].startTime = action.payload.startTime
        },
        setTaskEndTimeByIndex(state, action: PayloadAction<{ taskIndex: number, endTime: number }>) {
            state.tasksStates[action.payload.taskIndex].endTime = action.payload.endTime
        },
        setTaskCurrentSnapshotIndexByIndex(state, action: PayloadAction<{
            taskIndex: number,
            snapshotIndex: number | null
        }>) {
            state.tasksStates[action.payload.taskIndex].currentSnapshotIndex = action.payload.snapshotIndex
        },
        setCurrentTaskIndex(state, action: PayloadAction<number | null>) {
            state.currentTaskIndex = action.payload
        },
    }
})