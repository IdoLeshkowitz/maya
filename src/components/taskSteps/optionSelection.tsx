'use client'

import {useState} from "react";
import {OptionSelection} from "@/types/taskResult";
import {useAppDispatch, useAppSelector} from "../../../libs/redux/hooks";
import {RootState} from "../../../libs/redux/store";
import {TaskMeta} from "@/types/taskMeta";
import Board from "@components/board";
import {setCurrentTaskResultOptionSelection} from "../../../libs/redux/features/tasks/tasksActions";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
import {CommonButton} from "@components/button";

enum OptionSelectionSteps {
    SELECT_SIDE,
    SET_CONDFIDENCE,
}

function getCurrentTaskMeta(state: RootState): TaskMeta {
    return state.tasks.allTasks.at(state.tasks.currentTaskIndex!)!.taskMeta
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
        dispatch(setCurrentTaskResultOptionSelection(optionSelection))
        /* step forward  */
        dispatch(stepForward())
    }

    if (step === OptionSelectionSteps.SELECT_SIDE) {
        return (
            <Board
                taskMeta={currentTaskMeta}
                title={"Select a side"}
                onOptionSelected={(side) => {
                    setStep(OptionSelectionSteps.SET_CONDFIDENCE)
                    setSelectedSide(side)
                }}
            >
            </Board>
        )
    }
    if (step === OptionSelectionSteps.SET_CONDFIDENCE) {
        return (
            <div className="flex flex-col gap-5 container justify-evenly">
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
                <div className="flex flex-col gap-5 text-center mb-3 self-center">
                    <CommonButton
                        onClick={onSubmitted}
                        disabled={confidence === null}
                    >
                        submit
                    </CommonButton>
                </div>
            </div>
        )
    }
    return null
}
