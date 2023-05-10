import {Middleware} from "redux";
import {
    finishExperiment,
    finishGroupScoring,
    finishInstructions,
    finishLeftPreview,
    finishOptionSelection,
    finishRightPreview,
    finishTask,
    startExperiment,
    startGroupScoring,
    startInstructions,
    startLeftPreview,
    startNextTask,
    startOptionSelection,
    startRightPreview
} from "./userGestureActions";
import {setCurrentTaskIndex, setCurrentTaskStatus, setExperimentStatus} from "../progress/progressActions";
import {ExperimentStatus, TaskStatus} from "../progress/progressSlice";
import {RootState} from "../../store";
import {TaskResult} from "@/types/taskResult";
import {addTaskResult} from "../tasksResult/tasksResultActions";
import {resetCurrentTaskResult} from "../currentTaskResult/currentTaskResultActions";
import {resetCurrentTaskAnalytics} from "../currentTaskAnalytics/currentTaskAnalyticsActions";

/* experiment */
const startExperimentM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === startExperiment.type) {
        dispatch(startInstructions())
    }
}
const finishExperimentM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === finishExperiment.type) {
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
        dispatch(startGroupScoring())
    }
}

/* scores */
const startGroupScoringM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === startGroupScoring.type) {
        dispatch(setCurrentTaskStatus(TaskStatus.GROUP_SCORING))
    }
}
const finishGroupScoringM: Middleware = ({dispatch}) => next => action => {
    next(action)
    if (action.type === finishGroupScoring.type) {
        dispatch(finishTask())
    }
}

/* task */
const startNextTaskM: Middleware = ({getState, dispatch}) => next => action => {
    next(action)
    if (action.type === startNextTask.type) {
        /* check current task index */
        const state: RootState = getState()
        const {progress: {currentTaskIndex}} = state
        /* if current index is null initialize it to 0 */
        if (currentTaskIndex === null) {
            dispatch(setCurrentTaskIndex(0))
        } else {
            /* increment currentTaskIndex */
            dispatch(setCurrentTaskIndex(currentTaskIndex + 1))
        }
        /* start left preview */
        dispatch(startLeftPreview())
    }
}
const finishTaskM: Middleware = ({getState, dispatch}) => next => action => {
    next(action)
    if (action.type === finishTask.type) {
        /* add task result to results */
        const state: RootState = getState()
        const {currentTaskAnalytics, currentTaskResult, tasksMeta, progress} = state
        const optionSelection = currentTaskResult.optionSelection
        if (optionSelection === null) {
            throw new Error('currentTaskAnalytics.optionSelection is null')
        }
        const scores = currentTaskResult.scores
        if (scores === null) {
            throw new Error('currentTaskAnalytics.scores is null')
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
            optionSelection,
            scores,
            taskId: currentTaskId,
            duration
        }
        dispatch(addTaskResult(taskResult))

        /* reset currentTaskResult */
        dispatch(resetCurrentTaskResult())
        /* reset currentTaskAnalytics */
        dispatch(resetCurrentTaskAnalytics())

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
    startGroupScoringM,
    finishGroupScoringM,
    startNextTaskM,
    finishTaskM,
]
