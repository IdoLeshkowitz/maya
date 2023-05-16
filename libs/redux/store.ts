import {configureStore} from "@reduxjs/toolkit";
import {experimentSlice} from "./features/experiment/experimentSlice";
import {tasksSlice} from "./features/tasks/tasksSlice";
import {tasksMiddleware} from "./features/tasks/tasksMiddleware";
import {experimentMiddleware} from "./features/experiment/experimentMiddleware";
import {apiMiddleware} from "./features/api/apiMiddleware";

export const store = configureStore({
    reducer   : {
        experiment: experimentSlice.reducer,
        tasks     : tasksSlice.reducer,
    },
    middleware: [
        ...experimentMiddleware,
        ...apiMiddleware,
        ...tasksMiddleware
    ]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;