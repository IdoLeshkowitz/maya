import {Middleware} from "redux";
import {
    finishExperiment,
    finishInstructions,
    finishLeftOptionScoring,
    finishLeftPreview,
    finishOptionSelection,
    finishRightOptionScoring,
    finishRightPreview,
    finishTask,
    startExperiment,
    startInstructions,
    startLeftOptionScoring,
    startLeftPreview,
    startNextTask,
    startOptionSelection,
    startRightOptionScoring,
    startRightPreview
} from "./userGestureActions";
import {setCurrentTaskIndex, setCurrentTaskStatus, setExperimentStatus} from "../progress/progressActions";
import {ExperimentStatus, TaskStatus} from "../progress/progressSlice";
import {RootState} from "../../store";
import {TaskResult} from "@/types/taskResult";
import {addTaskResult} from "../tasksResult/tasksResultActions";
import {resetCurrentTaskResult} from "../currentTaskResult/currentTaskResultActions";
import {resetCurrentTaskAnalytics, setEndTime, setStartTime} from "../currentTaskAnalytics/currentTaskAnalyticsActions";

/* experiment */
const startExperimentM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === startExperiment.type) {
        dispatch(startInstructions())
    }
}
const finishExperimentM: Middleware = ({getState, dispatch}) => next => async (action) => {
    next(action)
    if (action.type === finishExperiment.type) {
        dispatch(setExperimentStatus(ExperimentStatus.RESULTS_PENDING))
        /* send the results to the server */
        const state: RootState = getState()
        const {tasksResults} = state
        if (tasksResults === null) {
            throw new Error("tasksResults is null")
        }
        const res = await fetch("/api/taskResults", {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body   : JSON.stringify(tasksResults)
        })
        if (!res.ok) {
            throw new Error("failed to send the results to the server")
        }
        dispatch(setExperimentStatus(ExperimentStatus.ENDED))
    }
}

/* instructions */
const startInstructionsM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === startInstructions.type) {
        dispatch(setExperimentStatus(ExperimentStatus.INSTRUCTIONS))
    }
}
const finishInstructionsM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === finishInstructions.type) {
        dispatch(startNextTask())
        dispatch(setExperimentStatus(ExperimentStatus.TASKS))
    }
}

/* preview */
const startLeftPreviewM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === startLeftPreview.type) {
        dispatch(setCurrentTaskStatus(TaskStatus.LEFT_PREVIEW))
    }
}
const finishLeftPreviewM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === finishLeftPreview.type) {
        dispatch(startRightPreview())
    }
}
const startRightPreviewM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === startRightPreview.type) {
        dispatch(setCurrentTaskStatus(TaskStatus.RIGHT_PREVIEW))
    }
}
const finishRightPreviewM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === finishRightPreview.type) {
        dispatch(setCurrentTaskStatus(TaskStatus.OPTION_SELECTION))
    }
}

/* option selection */
const startOptionSelectionM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === startOptionSelection.type) {
        dispatch(setCurrentTaskStatus(TaskStatus.OPTION_SELECTION))
    }
}
const finishOptionSelectionM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === finishOptionSelection.type) {
        dispatch(startLeftOptionScoring())
    }
}

/* scores */
const startLeftGroupScoringM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === startLeftOptionScoring.type) {
        dispatch(setCurrentTaskStatus(TaskStatus.LEFT_SCORES))
    }
}
const finishLeftGroupScoringM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === finishLeftOptionScoring.type) {
        dispatch(startRightOptionScoring())
    }
}
const startRightGroupScoringM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === startRightOptionScoring.type) {
        dispatch(setCurrentTaskStatus(TaskStatus.RIGHT_SCORES))
    }
}
const finishRightGroupScoringM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === finishRightOptionScoring.type) {
        dispatch(finishTask())
    }
}
/* task */
const startNextTaskM: Middleware = ({getState, dispatch}) => next => action => {
    next(action)
    if (action.type === startNextTask.type) {
        /* increase current task index */
        const state: RootState = getState()
        const {progress} = state
        const nextTaskIndex = progress.currentTaskIndex === null ? 0 : progress.currentTaskIndex + 1
        dispatch(setCurrentTaskIndex(nextTaskIndex))
        /* reset currentTaskResult */
        dispatch(resetCurrentTaskResult())
        /* reset currentTaskAnalytics */
        dispatch(resetCurrentTaskAnalytics())
        /* set start time */
        dispatch(setStartTime(Date.now()))
        /* start left preview */
        dispatch(startLeftPreview())
    }
}
const finishTaskM: Middleware = ({getState, dispatch}) => next => action => {
    next(action)
    if (action.type === finishTask.type) {
        /* set end time */
        dispatch(setEndTime(Date.now()))
        /* set task status */
        dispatch(setCurrentTaskStatus(TaskStatus.FINISHED))

        /* add task result to results */
        const state: RootState = getState()
        const {currentTaskAnalytics, currentTaskResult, tasksMeta, progress} = state
        const optionSelection = currentTaskResult.optionSelection
        if (optionSelection === null) {
            throw new Error('currentTaskAnalytics.optionSelection is null')
        }
        const rightScores = currentTaskResult.rightScores
        if (rightScores === null) {
            throw new Error('currentTaskAnalytics.rightScores is null')
        }
        const leftScores = currentTaskResult.leftScores
        if (leftScores === null) {
            throw new Error('currentTaskAnalytics.leftScores is null')
        }
        if (progress.currentTaskIndex === null) {
            throw new Error('progress.currentTaskIndex is null')
        }
        const currentTaskId = tasksMeta?.at(progress!.currentTaskIndex)?._id
        if (currentTaskId === undefined) {
            throw new Error('currentTaskId is null')
        }
        const {startTime, endTime} = currentTaskAnalytics
        if (startTime === null || endTime === null) {
            throw new Error('currentTaskAnalytics.startTime or endTime is null')
        }
        const duration = endTime - startTime
        const taskResult: TaskResult = {
            leftScores,
            rightScores,
            optionSelection,
            taskId: currentTaskId,
            duration
        }
        dispatch(addTaskResult(taskResult))
        /* check if this is the last task */
        if (progress.currentTaskIndex + 1 === tasksMeta?.length) {
            /* if it does finish experiment */
            dispatch(finishExperiment())
        }
        /* else start next task */
        else {
            dispatch(startNextTask())
        }
    }
}


export const userGestureMiddleware: Middleware[] = [
    startExperimentM,
    finishExperimentM,
    startInstructionsM,
    finishInstructionsM,
    startLeftPreviewM,
    finishLeftPreviewM,
    startRightPreviewM,
    finishRightPreviewM,
    startOptionSelectionM,
    finishOptionSelectionM,
    startLeftGroupScoringM,
    finishLeftGroupScoringM,
    startRightGroupScoringM,
    finishRightGroupScoringM,
    startNextTaskM,
    finishTaskM,
]
