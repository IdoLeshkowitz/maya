import {TaskMeta} from "@/types/taskMeta";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type TasksMetaState = TaskMeta[] | null
const initialState: TasksMetaState = null
export const tasksMetaSlice = createSlice({
    initialState: initialState as TasksMetaState,
    name        : 'tasksMeta',
    reducers    : {
        setTasksMeta(state, action: PayloadAction<TaskMeta[]>) {
            return action.payload
        }
    }
})