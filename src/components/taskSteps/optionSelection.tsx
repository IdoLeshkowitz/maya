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
import CommonLayout from "@components/commonLayout";

enum OptionSelectionSteps {
    SELECT_SIDE,
    SET_CONDFIDENCE,
}

function getCurrentTaskMeta(state: RootState): TaskMeta {
    return state.tasks.tasksStates.at(state.tasks.currentTaskIndex!)!.taskMeta
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
                title={`Based on your observations, which portfolio performed better?\nClick on the name of the portfolio that performed better.`}
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
            <CommonLayout
                header={
                    <p className="text-black text-base">
                        How confident are you in your selection, on a scale of 0-100, where 0 is not confident at all
                        and 100 is extremely confident?
                    </p>
                }
                footer={
                    <div className="flex justify-center items-center">
                        <CommonButton
                            onClick={onSubmitted}
                            disabled={confidence === null}
                        >
                            Next
                        </CommonButton>
                    </div>
                }
            >
                {/*confidence slider*/}
                <div className="flex flex-col justify-center gap-5 text-center mb-3">
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
                        {confidence ?? 0}
                    </p>
                </div>
            </CommonLayout>
        )
    }
    return null
}
