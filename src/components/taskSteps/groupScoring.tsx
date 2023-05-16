'use client'
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../libs/redux/hooks";
import {RootState} from "../../../libs/redux/store";
import {TaskMeta} from "@/types/taskMeta";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
import Board from "@components/board";
import {CommonButton} from "@components/button";

enum GroupScoringSteps {
    LEFT_OPTION_SCORING,
    RIGHT_OPTION_SCORING
}

function getCurrentTaskMeta(state: RootState): TaskMeta {
    return state.tasks.allTasks.at(state.tasks.currentTaskIndex!)!.taskMeta
}

export default function GroupScoring() {
    const dispatch = useAppDispatch()
    const [step, setStep] = useState<GroupScoringSteps>(GroupScoringSteps.LEFT_OPTION_SCORING)
    const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0)
    const [performance, setPerformance] = useState<number | null>(null)
    const currentTaskMeta = useAppSelector(getCurrentTaskMeta)

    function next() {
        /* if user didn't set performance do nothing */
        if (performance === null) {
            return
        }
        if (step === GroupScoringSteps.LEFT_OPTION_SCORING) {
            const numberOfGroupsInOption = currentTaskMeta.leftOption.groupsNames.length
            /* if there are more groups in the left option, go to the next group */
            if (currentGroupIndex < numberOfGroupsInOption - 1) {
                /* set performance to null */
                setPerformance(null)
                /* set group index to next group */
                setCurrentGroupIndex(currentGroupIndex + 1)
                return
            }
            /* if there are no more groups in the left option, go to the right option */
            /* set the step to right option scoring */
            setStep(GroupScoringSteps.RIGHT_OPTION_SCORING)
            /* set the current group index to 0 */
            setCurrentGroupIndex(0)
            /* set performance to null */
            setPerformance(null)
        }
        if (step === GroupScoringSteps.RIGHT_OPTION_SCORING) {
            const numberOfGroupsInOption = currentTaskMeta.rightOption.groupsNames.length
            /* if there are more groups in the right option, go to the next group */
            if (currentGroupIndex < numberOfGroupsInOption - 1) {
                /* set performance to null */
                setPerformance(null)
                /* set group index to next group */
                setCurrentGroupIndex(currentGroupIndex + 1)
                return
            }
            /* if there are no more groups in the right option, go to the next task */
            dispatch(stepForward())
        }
    }

    return (
        <Board
            taskMeta={currentTaskMeta}
            title="Based on your observations, what was the performance of this industry on a scale of 0-100, where 0 is very bad and 100 is very good?"
            snapshot={{
                side    : step === GroupScoringSteps.LEFT_OPTION_SCORING ? 'left' : 'right',
                snapshot: {
                    groupIndex: currentGroupIndex,
                    label     : '',
                    indicator : 'loading'
                }
            }}
        >
            <div className="flex flex-col self-stretch items-center justify-center gap-8">
                {/* slider */}
                <div className="flex self-stretch justify-center">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        className="basis-2/3"
                        value={performance ?? 0}
                        onChange={(event) => {
                            setPerformance(parseInt(event.target.value))
                        }}
                    />
                </div>
                <p className="text-2xl font-bold text-black">
                    {performance ?? 0}%
                </p>
                {/*next button*/}
                <CommonButton
                    onClick={next}
                    disabled={performance === null}
                >
                    Next
                </CommonButton>
            </div>
        </Board>
    )
}

