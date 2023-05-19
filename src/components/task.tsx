'use client'
import {FC} from "react";
import {useAppSelector} from "../../libs/redux/hooks";
import {RootState} from "../../libs/redux/store";
import {TaskStep} from "../../libs/redux/features/tasks/tasksSlice";
import Welcome from "@components/taskSteps/welcome";
import TaskInstructions from "@components/taskSteps/taskInstructions";
import Performance from "@components/taskSteps/performance";
import OptionSelection from "@components/taskSteps/optionSelection";
import GroupScoring from "@components/taskSteps/groupScoring";

function getCurrentTaskState(state: RootState) {
    return state.tasks.tasksStates.at(state.tasks.currentTaskIndex!)!
}


const Task: FC = () => {
    const currentTaskState = useAppSelector(getCurrentTaskState)
    const currentTaskStep = currentTaskState.taskStep
    if (currentTaskStep === TaskStep.IDLE) {
        return <Welcome/>
    }
    if (currentTaskStep === TaskStep.TASK_INSTRUCTIONS) {
        return <TaskInstructions/>
    }
    if (currentTaskStep === TaskStep.PERFORMANCE) {
        return <Performance/>
    }
    if (currentTaskStep === TaskStep.OPTION_SELECTION) {
        return <OptionSelection/>
    }
    if (currentTaskStep === TaskStep.GROUP_SCORING) {
        return <GroupScoring/>
    }
    return null
}


export default Task

