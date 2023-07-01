import {Middleware} from "redux";
import {
    initializeExperiment,
    setExperimentId,
    setExperimentMeta,
    setExperimentStartTime,
    setExperimentStep,
    stepForward
} from "./experimentActions";
import {ExperimentStep} from "./experimentSlice";
import {RootState} from "../../store";
import {
    setAllTasksState,
    setCurrentTaskEndTime,
    setCurrentTaskIndex,
    setCurrentTaskSnapshotIndex, setCurrentTaskStartTime,
    setCurrentTaskStep, setPreviewSideByIndex,
    setTaskCurrentSnapshotIndexByIndex
} from "../tasks/tasksActions";
import {TaskState, TaskStep} from "../tasks/tasksSlice";
import {Task} from "@/types/task";
import {submitCurrentTaskResults, submitPersonalDetails} from "../api/apiActions";

function getCurrentTaskIndex(state: RootState) {
    return state.tasks.currentTaskIndex
}

function getExperimentStep(state: RootState) {
    return state.experiment.experimentStep
}

const stepForwardSplit: Middleware = ({dispatch, getState}) => next => async (action) => {
    next(action)
    if (action.type === stepForward.type) {
        /* check the current experiment step */
        const state: RootState = getState()
        const experimentStep = getExperimentStep(state)
        if (experimentStep === ExperimentStep.IDLE) {
            dispatch(setExperimentStep(ExperimentStep.CONSENT))
            return;
        }
        if (experimentStep === ExperimentStep.CONSENT) {
            dispatch(setExperimentStep(ExperimentStep.INTRO))
            return;
        }
        if (experimentStep === ExperimentStep.INTRO) {
            /* start the first task */
            /* set experiment step to tasks */
            dispatch(setExperimentStep(ExperimentStep.TASKS))
            /* set current task index to 0 */
            dispatch(setCurrentTaskIndex(0))
            return;
        }
        if (experimentStep === ExperimentStep.TASKS) {
            /* check current task step  */
            const currentTaskStep = state.tasks.tasksStates[getCurrentTaskIndex(state)!].taskStep
            /* if the current task step is idle, head next to instructions */
            if (currentTaskStep === TaskStep.IDLE) {
                /* start current task step to instructions */
                dispatch(setCurrentTaskStep(TaskStep.TASK_INSTRUCTIONS))
                dispatch(setCurrentTaskStartTime(Date.now()))
                return;
            }
            /* if the current task step is task instructions, head next to performance */
            if (currentTaskStep === TaskStep.TASK_INSTRUCTIONS) {
                /* set current task step to performance */
                dispatch(setCurrentTaskStep(TaskStep.PERFORMANCE))
                /* check if there are any snapshots in current task */
                const numberOfSnapshots = state.tasks.tasksStates[getCurrentTaskIndex(state)!].taskMeta.performance.options.reduce((acc, option) => acc + option.snapshots.length, 0)
                /* if there are no snapshots, head next to option selection */
                if (numberOfSnapshots === 0) {
                    /* set current task step to option selection */
                    dispatch(setCurrentTaskStep(TaskStep.OPTION_SELECTION))
                    return;
                }
                /* if there are snapshots, set current snapshot index to 0 */
                /* set current snapshot index to 0 */
                dispatch(setCurrentTaskSnapshotIndex(0))
                /* set current preview side to left */
                dispatch(setPreviewSideByIndex({taskIndex: getCurrentTaskIndex(state)!, previewSide: 'LEFT'}))
                /* set current task step to performance */
                dispatch(setCurrentTaskStep(TaskStep.PERFORMANCE))
                return;
            }
            /* if the current task step is performance, head next to next snapshot or option selection */
            if (currentTaskStep === TaskStep.PERFORMANCE) {
                const currentPreviewSide = state.tasks.tasksStates[getCurrentTaskIndex(state)!].currentPreviewSide
                /* grab current snapshot index */
                const currentSnapshotIndex = state.tasks.tasksStates[getCurrentTaskIndex(state)!].currentSnapshotIndex ?? -1
                /* grab total number of snapshots */
                const numberOfSnapshotsInCurrentSide = state.tasks.tasksStates[getCurrentTaskIndex(state)!].taskMeta.performance.options[currentPreviewSide === 'LEFT' ? 0 : 1].snapshots.length
                /* check if there are any snapshots left */
                if (currentSnapshotIndex! < numberOfSnapshotsInCurrentSide - 1) {
                    /* if there are snapshots left, head next to next snapshot */
                    /* increment current snapshot index */
                    dispatch(setTaskCurrentSnapshotIndexByIndex({taskIndex: getCurrentTaskIndex(state)!, snapshotIndex: currentSnapshotIndex! + 1}))
                    return;
                } else {
                    if (currentPreviewSide === 'LEFT') {
                        dispatch(setPreviewSideByIndex({taskIndex: getCurrentTaskIndex(state)!, previewSide: 'RIGHT'}))
                        /* set current snapshot index to 0 */
                        dispatch(setCurrentTaskSnapshotIndex(0))
                        return;
                    }
                    /* if there are no snapshots left, head next to option selection */
                    /* set current task step to option selection */
                    dispatch(setCurrentTaskStep(TaskStep.OPTION_SELECTION))
                    return;
                }
            }
            /* if the current step is option selection, head next to group scoring */
            if (currentTaskStep === TaskStep.OPTION_SELECTION) {
                /* set current task step to group scoring */
                dispatch(setCurrentTaskStep(TaskStep.GROUP_SCORING))
                return;
            }
            /*
            this is the last step of the task,
            if the current step is group scoring, head to next task or head to form
            */
            if (currentTaskStep === TaskStep.GROUP_SCORING) {
                /* set end time */
                dispatch(setCurrentTaskEndTime(Date.now()))
                /* submit task result */
                dispatch(submitCurrentTaskResults())
                /* check if there are any tasks left */
                const numberOfAvailableTasks = state.tasks.tasksStates.length
                const currentTaskIndex = state.tasks.currentTaskIndex!
                const tasksLeft = numberOfAvailableTasks - currentTaskIndex - 1
                if (!tasksLeft) {
                    /* if there are no tasks left head to form  */
                    /* set current task index to null */
                    dispatch(setCurrentTaskIndex(null))
                    /* set experiment step to form */
                    dispatch(setExperimentStep(ExperimentStep.FORM))
                    return;
                }
                /* if there are tasks left, head to next task */
                /* increment current task index */
                dispatch(setCurrentTaskIndex(currentTaskIndex + 1))
                return;
            }
        }
        /*
        this is the last step of the experiment,
        if the current step is form send the results and finish the experiment
         */
        if (experimentStep === ExperimentStep.FORM) {
            dispatch(setExperimentStep(ExperimentStep.LOADING))
            dispatch(submitPersonalDetails())
        }
    }
}

const initializeExperimentM: Middleware = ({dispatch, getState}) => next => action => {
    next(action)
    if (action.type === initializeExperiment.type) {
        const experiment = action.payload.data.experiment
        const experimentMeta = action.payload.data.experimentMeta
        const tasksMeta = action.payload.data.tasksMeta
        const tasks = action.payload.data.tasks
        dispatch(setExperimentStartTime(Date.now()))
        dispatch(setExperimentId(experiment._id))
        dispatch(setExperimentMeta(experimentMeta))
        dispatch(setAllTasksState(tasks.map((task: Task, index: number): TaskState => {
            return {
                currentPreviewSide: null,
                taskMeta          : tasksMeta[index],
                taskStep          : TaskStep.IDLE,
                _id               : task._id,
            }
        })))
        dispatch(setExperimentStep(ExperimentStep.IDLE))
    }
}
export const experimentMiddleware = [stepForwardSplit, initializeExperimentM]
