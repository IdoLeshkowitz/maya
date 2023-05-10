'use client'
import {FC} from "react";
import {useAppSelector} from "../../libs/redux/hooks";
import {RootState} from "../../libs/redux/store";
import {TaskStatus} from "../../libs/redux/features/progress/progressSlice";
import Preview from "@components/Preview";
import OptionSelection from "@components/optionSelection";

function getCurrentTaskMeta(state: RootState) {
    const currentTaskIndex = state.progress.currentTaskIndex
    if (currentTaskIndex === null) {
        throw new Error('currentTaskIndex is undefined')
    }
    const currentTask = state.tasksMeta?.at(currentTaskIndex)
    if (!currentTask) {
        throw new Error('currentTask is undefined')
    }
    return currentTask
}

function getCurrentTaskStatus(state: RootState) {
    const currentTaskStatus = state.progress.currentTaskStatus
    if (currentTaskStatus === null) {
        throw new Error('currentTaskIndex is undefined')
    }
    return currentTaskStatus as TaskStatus
}


const Task: FC = () => {
    const currentTaskMeta = useAppSelector(getCurrentTaskMeta)
    const currentTaskStatus = useAppSelector(getCurrentTaskStatus)
    if (currentTaskStatus === TaskStatus.LEFT_PREVIEW || currentTaskStatus === TaskStatus.RIGHT_PREVIEW) {
        return <Preview/>
    }
    if (currentTaskStatus === TaskStatus.OPTION_SELECTION) {
        return <OptionSelection/>
    }
    if (currentTaskStatus === TaskStatus.GROUP_SCORING) {

    }
    return null
}


export default Task

