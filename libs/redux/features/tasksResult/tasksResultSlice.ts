import {TaskResult} from "@/types/taskResult";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type TaskResults = TaskResult[] | null
const initialState: TaskResults = null
export const tasksResultsSlice = createSlice({
    initialState: null as TaskResults,
    name        : 'taskResults',
    reducers    : {
        addTaskResult(state, action: PayloadAction<TaskResult>) {
            if (!action.payload) return state
            if (!state) return [action.payload]
            return [...state, action.payload]
        }
    }
})