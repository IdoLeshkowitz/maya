import {Middleware} from "redux";
import {setExperimentStep, stepForward} from "./experimentActions";
import {ExperimentStep} from "./experimentSlice";
import {RootState} from "../../store";
import {setCurrentTaskIndex, setCurrentTaskStartTime, setCurrentTaskStep} from "../tasks/tasksActions";
import {TaskStep} from "../tasks/tasksSlice";


const stepForwardSplit: Middleware = ({dispatch, getState}) => next => action => {
    next(action)
    if (action.type === stepForward.type) {
        /* check the current experiment step */
        const state: RootState = getState()
        switch (state.experiment.experimentStep) {
            case ExperimentStep.IDLE:
                dispatch(setExperimentStep(ExperimentStep.CONSENT))
                break
            case ExperimentStep.CONSENT:
                dispatch(setExperimentStep(ExperimentStep.INSTRUCTIONS))
                break
            case ExperimentStep.INSTRUCTIONS:
                /* check if there are any tasks left */
                const numberOfAvailableTasks = state.tasks.allTasks.length
                /* if there are no tasks available, end the experiment */
                if (numberOfAvailableTasks === 0) {
                    dispatch(setExperimentStep(ExperimentStep.ENDED_ERROR))
                    return
                }
                /* if there are tasks available, start the first one */
                /* set experiment step */
                dispatch(setExperimentStep(ExperimentStep.TASKS))
                /* initialize current task index */
                dispatch(setCurrentTaskIndex(0))
                break
            case ExperimentStep.TASKS:
                /* check current task step  */
                const currentTaskIndex = state.tasks.currentTaskIndex!
                const currentTaskStep = state.tasks.allTasks[currentTaskIndex].taskStep
                switch (currentTaskStep) {
                    case TaskStep.IDLE:
                        /* start instructions */
                        dispatch(setCurrentTaskStep(TaskStep.INSTRUCTIONS))
                        /* set task start time */
                        dispatch(setCurrentTaskStartTime(Date.now()))
                        /* set empty task result */
                        break
                    case TaskStep.INSTRUCTIONS:
                        dispatch(setCurrentTaskStep(TaskStep.PERFORMANCE))
                        break
                    case TaskStep.PERFORMANCE:
                        dispatch(setCurrentTaskStep(TaskStep.OPTION_SELECTION))
                        break
                    case TaskStep.OPTION_SELECTION:
                        dispatch(setCurrentTaskStep(TaskStep.GROUP_SCORING))
                        break
                    case TaskStep.GROUP_SCORING:
                        /* set end time */
                        dispatch(setCurrentTaskStartTime(Date.now()))
                        /* check if there are any tasks left */
                        const numberOfAvailableTasks = state.tasks.allTasks.length
                        const currentTaskIndex = state.tasks.currentTaskIndex!
                        const tasksLeft = numberOfAvailableTasks - currentTaskIndex - 1
                        /* if there are no tasks left  */
                        if (!tasksLeft) {
                            /* set current task index to null */
                            dispatch(setCurrentTaskIndex(null))
                            /* set experiment step to FORM*/
                            dispatch(setExperimentStep(ExperimentStep.FORM))
                            break
                        }
                        /* if there are tasks left, start the next one */
                        /* increase current task index */
                        dispatch(setCurrentTaskIndex(currentTaskIndex + 1))
                }
                break
            case ExperimentStep.FORM:
                /* send the task results and the form data to the server */
                break
        }
    }
}

export const experimentMiddleware = [stepForwardSplit]