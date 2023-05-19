import {createAction} from "@reduxjs/toolkit";
import {tasksSlice, TaskStep} from "./tasksSlice";
import {TaskMeta} from "@/types/taskMeta";
import {OptionSelection} from "@/types/taskResult";

export const {setTaskCurrentSnapshotIndexByIndex,setTaskStepByIndex, setAllTasksState, setTaskResultByIndex, setCurrentTaskIndex, setTaskStartTimeByIndex, setTaskEndTimeByIndex} = tasksSlice.actions
export const setCurrentTaskStep = createAction<TaskStep>('tasks/setCurrentTaskStep')
export const startFirstTask = createAction('tasks/startFirstTask')
export const setCurrentTaskStartTime = createAction<number>('tasks/setCurrentTaskStartTime')
export const setCurrentTaskEndTime = createAction<number>('tasks/setCurrentTaskEndTime')
export const setCurrentTaskResultOptionSelection = createAction<OptionSelection>('tasks/setCurrentTaskResultOptionSelection')
export const setCurrentTaskResultLeftScores = createAction<number[]>('tasks/setCurrentTaskLeftScores')
export const setCurrentTaskResultRightScores = createAction<number[]>('tasks/setCurrentTaskRightScores')
export const setCurrentTaskSnapshotIndex = createAction<number | null>('tasks/setCurrentTaskSnapshotIndex')