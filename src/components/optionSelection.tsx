'use client'

import {useState} from "react";
import {OptionSelection} from "@/types/taskResult";
import {useAppDispatch, useAppSelector} from "../../libs/redux/hooks";
import {setCurrentTaskOptionSelection} from "../../libs/redux/features/currentTaskResult/currentTaskResultActions";
import {finishOptionSelection} from "../../libs/redux/features/userGesture/userGestureActions";
import Option from "@components/option";
import {TaskStatus} from "../../libs/redux/features/progress/progressSlice";
import Group from "@components/group";
import {RootState} from "../../libs/redux/store";
import {TaskMeta} from "@/types/taskMeta";

enum OptionSelectionSteps {
    SELECT_SIDE,
    SET_CONDFIDENCE,
}

function getCurrentTaskMeta(state: RootState): TaskMeta {
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

export default function OptionSelection() {
    const [step, setStep] = useState<OptionSelectionSteps>(OptionSelectionSteps.SELECT_SIDE)
    const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null)
    const [confidence, setConfidence] = useState<number | null>(null)
    const dispatch = useAppDispatch()
    const currentTaskMeta = useAppSelector(getCurrentTaskMeta)

    function onSubmitted() {
        if (selectedSide === null || confidence === null) {
            return
        }
        const optionSelection: OptionSelection = {
            selectedSide,
            confidence
        }
        /* dispatch set current task result */
        dispatch(setCurrentTaskOptionSelection(optionSelection))
        /* dispatch finish option selection */
        dispatch(finishOptionSelection())
    }

    if (step === OptionSelectionSteps.SELECT_SIDE) {
        return (
            <div className="flex flex-col gap-5">
                {/*instructions*/}
                <div className="flex flex-col gap-5 text-center mb-3">
                    <p className="text-2xl font-bold text-black">
                        Select the side you prefer
                    </p>
                </div>

                <div className="flex flex-row  items-stretch justify-evenly">
                    {/*left option */}
                    <Option
                        optionName={currentTaskMeta.leftOption.optionName}
                        optionColor={currentTaskMeta.leftOption.optionColor}
                        selectable={true}
                        onClick={() => {
                            setSelectedSide('left')
                            setStep(OptionSelectionSteps.SET_CONDFIDENCE)
                        }}
                    >
                        {
                            currentTaskMeta.leftOption.groupsNames.map((groupName, index) => {
                                return (
                                    <Group
                                        key={index}
                                        groupName={groupName}
                                    />
                                )
                            })
                        }
                    </Option>

                    {/*right option */}
                    <Option
                        optionName={currentTaskMeta.rightOption.optionName}
                        optionColor={currentTaskMeta.rightOption.optionColor}
                        selectable={true}
                        onClick={() => {
                            setSelectedSide('right')
                            setStep(OptionSelectionSteps.SET_CONDFIDENCE)
                        }}
                    >
                        {
                            currentTaskMeta.rightOption.groupsNames.map((groupName, index) => {
                                return (
                                    <Group
                                        key={index}
                                        groupName={groupName}
                                    />
                                )
                            })
                        }
                    </Option>
                </div>
            </div>
        )
    }
    if (step === OptionSelectionSteps.SET_CONDFIDENCE) {
        return (
            <div className="flex flex-col gap-5">
                {/*instructions*/}
                <div className="flex flex-col gap-5 text-center mb-3">
                    <p className="text-2xl font-bold text-black">
                        How confident are you in your choice?
                    </p>
                </div>
                {/*confidence slider*/}
                <div className="flex flex-col gap-5 text-center mb-3">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={confidence ?? 0}
                        onChange={(event) => {
                            setConfidence(parseInt(event.target.value))
                        }}
                    />
                    <p className="text-2xl font-bold text-black">
                        {confidence ?? 0}%
                    </p>
                </div>
                {/*submit button*/}
                <div className="flex flex-col gap-5 text-center mb-3">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onSubmitted}
                    >
                        Submit
                    </button>
                </div>
            </div>
        )
    }
    return null
}
