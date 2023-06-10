import {Middleware} from "redux";
import {submitCurrentTaskResults, submitPersonalDetails} from "./apiActions";
import {PersonalDetails} from "@/types/personalDetails";
import {RootState} from "../../store";
import {setTaskResultByIndex} from "../tasks/tasksActions";
import {Task} from "@/types/task";
import {Experiment} from "@/types/experiment";
import {setExperimentStep} from "../experiment/experimentActions";
import {ExperimentStep} from "../experiment/experimentSlice";

const submitPersonalDetailsM: Middleware = ({dispatch, getState}) => next => async (action) => {
    next(action)
    if (action.type === submitPersonalDetails.type) {
        const state: RootState = getState()
        const personalDetails: PersonalDetails = {
            ...state.experiment.personalDetails!,
            belongsToExperiment: state.experiment.experimentId!
        }
        try {
            const response = await fetch('/api/personalDetails', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body   : JSON.stringify(personalDetails)
            })
            if (!response.ok) {
                dispatch(setExperimentStep(ExperimentStep.ENDED_ERROR))
                return Promise.reject(response.statusText)
            }
            dispatch(setExperimentStep(ExperimentStep.ENDED_SUCCESS))
        } catch (e) {
            console.error(e)
            dispatch(setExperimentStep(ExperimentStep.ENDED_ERROR))
        }
        const experiment: Experiment = {
            experimentMetaId : state.experiment.experimentMeta?._id!,
            personalDetailsId: personalDetails._id!,
            _id              : state.experiment.experimentId!
        }
        try {
            const response = await fetch('/api/experiment', {
                method : 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body   : JSON.stringify(experiment)
            })
            if (!response.ok) {
                return Promise.reject(response.statusText)
            }
        } catch (e) {
            console.error(e)
            return Promise.reject(e)
        }
    }
}

const submitCurrentTaskResultM: Middleware = ({dispatch, getState}) => next => async (action) => {
    next(action)
    if (action.type === submitCurrentTaskResults.type) {
        const state: RootState = getState()
        const taskState = state.tasks.tasksStates[state.tasks.currentTaskIndex!]
        const currentTaskIndex = state.tasks.currentTaskIndex!
        const taskResult = state.tasks.tasksStates[currentTaskIndex].taskResult!
        /* insert TaskResult to DB */
        try {
            const response = await fetch('/api/taskResult', {
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body   : JSON.stringify(taskResult)
            })
            if (!response.ok) {
                return Promise.reject(response.statusText)
            }
            const data = await response.json()
            dispatch(setTaskResultByIndex({
                taskIndex : currentTaskIndex,
                taskResult: {
                    ...taskResult,
                    _id: data.insertedId
                }
            }))
            const task: Task = {
                _id         : taskState._id,
                taskResultId: data.insertedId,
                taskMetaId  : taskState.taskMeta._id!,
            }
            /* update task with taskResultId */
            try {
                const response = await fetch('/api/task', {
                    method : 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body   : JSON.stringify(task)
                })
                const data = await response.json()
                console.log(data)
                if (!response.ok) {
                    return Promise.reject(response.statusText)
                }
            } catch (e) {
                console.error(e)
                return Promise.reject(e)
            }
        } catch (e) {
            console.error(e)
            return Promise.reject(e)
        }
    }
}
export const apiMiddleware = [submitCurrentTaskResultM, submitPersonalDetailsM]