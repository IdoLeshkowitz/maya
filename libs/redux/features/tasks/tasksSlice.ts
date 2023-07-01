import {TaskMeta} from "@/types/taskMeta";
import {TaskResult} from "@/types/taskResult";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ObjectId} from "bson";

export enum TaskStep {
    IDLE = "IDLE",
    TASK_INSTRUCTIONS = "TASK_INSTRUCTIONS",
    PERFORMANCE = "PERFORMANCE",
    OPTION_SELECTION = "OPTION_SELECTION",
    GROUP_SCORING = "GROUP_SCORING",
    FINISHED = "FINISHED"
}

export interface TaskState {
    _id?: ObjectId
    taskMeta: TaskMeta
    taskResult?: TaskResult
    taskStep: TaskStep
    currentSnapshotIndex?: number
    currentPreviewSide: "LEFT" | "RIGHT" | null
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
        setTaskCurrentSnapshotIndexByIndex(state, action: PayloadAction<{
            taskIndex: number,
            snapshotIndex: number
        }>) {
            state.tasksStates[action.payload.taskIndex].currentSnapshotIndex = action.payload.snapshotIndex
        },
        setCurrentTaskIndex(state, action: PayloadAction<number | null>) {
            state.currentTaskIndex = action.payload
        },
        setTaskStateByIndex(state, action: PayloadAction<{ taskIndex: number, taskState: TaskState }>) {
            state.tasksStates[action.payload.taskIndex] = action.payload.taskState
        },
        setTaskResultIdByIndex(state, action: PayloadAction<{ taskIndex: number, taskResultId: ObjectId }>) {
            const taskState = state.tasksStates[action.payload.taskIndex]
            taskState.taskResult!._id = action.payload.taskResultId
        },
        setPreviewSideByIndex(state, action: PayloadAction<{
            taskIndex: number,
            previewSide: "LEFT" | "RIGHT" | null
        }>) {
            console.log('setPreviewSideByIndex', action.payload)
            state.tasksStates[action.payload.taskIndex].currentPreviewSide = action.payload.previewSide
        }
    }
})