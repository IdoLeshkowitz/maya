import {configureStore} from "@reduxjs/toolkit";
import {progressSlice} from "./features/progress/progressSlice";
import {tasksResultSlice} from "./features/tasksResult/tasksResultSlice";
import {tasksMetaSlice} from "./features/tasksMeta/tasksMetaSlice";
import {experimentMetaSlice} from "./features/experimentMeta/experimentMetaSlice";
import {currentTaskResultSlice} from "./features/currentTaskResult/currentTaskResultSlice";
import {userGestureMiddleware} from "./features/userGesture/userGestureMiddleware";
import {currentTaskAnalyticsSlice} from "./features/currentTaskAnalytics/currentTaskAnalyticsSlice";

export const store = configureStore({
    reducer   : {
        tasksMeta           : tasksMetaSlice.reducer,
        experimentMeta      : experimentMetaSlice.reducer,
        progress            : progressSlice.reducer,
        tasksResults        : tasksResultSlice.reducer,
        currentTaskResult   : currentTaskResultSlice.reducer,
        currentTaskAnalytics: currentTaskAnalyticsSlice.reducer
    },
    middleware: [
        ...userGestureMiddleware,
    ]
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;