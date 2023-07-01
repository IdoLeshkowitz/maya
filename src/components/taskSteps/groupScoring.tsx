'use client'
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../libs/redux/hooks";
import {RootState} from "../../../libs/redux/store";
import {TaskMeta} from "@/types/taskMeta";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
import Board from "@components/board";
import {CommonButton} from "@components/button";
import {SnapshotIndicator} from "@/types/preview";
import Slider from "@components/slider";
import {
    setCurrentTaskResultLeftScores,
    setCurrentTaskResultRightScores
} from "../../../libs/redux/features/tasks/tasksActions";
import Header from "@components/header";

enum GroupScoringSteps {
    LEFT_OPTION_SCORING,
    RIGHT_OPTION_SCORING
}

function getCurrentTaskMeta(state: RootState): TaskMeta {
    return state.tasks.tasksStates.at(state.tasks.currentTaskIndex!)!.taskMeta
}

interface Scores {
    left: number [],
    right: number []
}

export default function GroupScoring() {
    const dispatch = useAppDispatch()
    const [step, setStep] = useState<GroupScoringSteps>(GroupScoringSteps.LEFT_OPTION_SCORING)
    const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0)
    const [userScore, setUserScore] = useState<number | null>(null)
    const currentTaskMeta = useAppSelector(getCurrentTaskMeta)
    const [allScores, setAllScores] = useState<Scores>({left: [], right: []})

    function next() {
        /* if user didn't set performance do nothing */
        if (userScore === null) {
            return
        }
        if (step === GroupScoringSteps.LEFT_OPTION_SCORING) {
            const updatedLeftScores = [...allScores.left, userScore]
            /* update all scores */
            setAllScores({...allScores, left: updatedLeftScores})
            /* check if this is the last group in the left option */
            const numberOfGroupsInOption = currentTaskMeta.leftOption.groupsNames.length
            /* if false, go to the next group */
            if (currentGroupIndex < numberOfGroupsInOption - 1) {
                /* set performance to null */
                setUserScore(null)
                /* set group index to next group */
                setCurrentGroupIndex(currentGroupIndex + 1)
                return
            }
            /* if true, submit result and move to right option */
            /* submit result */
            dispatch(setCurrentTaskResultLeftScores([...updatedLeftScores]))
            /* set the current group index to 0 */
            setCurrentGroupIndex(0)
            /* set performance to null */
            setUserScore(null)
            /* set the step to right option scoring */
            setStep(GroupScoringSteps.RIGHT_OPTION_SCORING)
        }
        if (step === GroupScoringSteps.RIGHT_OPTION_SCORING) {
            /* update all scores */
            const updatedRightScores = [...allScores.right, userScore]
            setAllScores({...allScores, right: [...updatedRightScores]})
            /* check if this is the last group in the right option */
            const numberOfGroupsInOption = currentTaskMeta.rightOption.groupsNames.length
            /* if there are more groups in the right option, go to the next group */
            if (currentGroupIndex < numberOfGroupsInOption - 1) {
                /* set performance to null */
                setUserScore(null)
                /* set group index to next group */
                setCurrentGroupIndex(currentGroupIndex + 1)
                return
            }
            /* submit result */
            dispatch(setCurrentTaskResultRightScores([...updatedRightScores]))
            /* move to the next step */
            dispatch(stepForward())
        }
    }

    return (
        <Board
            taskMeta={currentTaskMeta}
            header={
                <Header>
                    Based on your observations, what was the performance of this industry on a scale of 0-100, where 0
                    is very bad and 100 is very good?
                </Header>
            }
            snapshot={{
                optionSide: step === GroupScoringSteps.LEFT_OPTION_SCORING ? "LEFT" : "RIGHT",
                groupIndex: currentGroupIndex,
                indicator : SnapshotIndicator.NONE
            }}
        >
            <div className="flex flex-col self-stretch items-center justify-center gap-8">
                {/* slider */}
                <Slider
                    value={userScore ?? undefined}
                    onChange={(score) => setUserScore(score)}
                />
                {/*next button*/}
                <CommonButton
                    onClick={next}
                    disabled={userScore === null}
                >
                    Next
                </CommonButton>
            </div>
        </Board>
    )
}

