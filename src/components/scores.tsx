'use client'
import {useState} from "react";
import {Score as ScoreType} from "@/types/taskResult";
import {RootState} from "../../libs/redux/store";
import {useAppDispatch, useAppSelector} from "../../libs/redux/hooks";
import {TaskStatus} from "../../libs/redux/features/progress/progressSlice";
import {
    finishLeftOptionScoring,
    finishRightOptionScoring
} from "../../libs/redux/features/userGesture/userGestureActions";
import {
    addCurrentTaskLeftScore,
    addCurrentTaskRightScore
} from "../../libs/redux/features/currentTaskResult/currentTaskResultActions";
import Option from "@components/option";
import Group from "@components/group";

function getCurrentTaskStatus(state: RootState) {
    if (state.progress.currentTaskStatus === null) {
        throw new Error('currentTaskStatus is undefined')
    }
    return state.progress.currentTaskStatus
}

function getNumberOfGroups(state: RootState) {
    /* find current task */
    const currentTaskIndex = state.progress.currentTaskIndex
    if (currentTaskIndex === null) {
        throw new Error('currentTaskIndex is undefined')
    }
    const currentTask = state.tasksMeta?.at(currentTaskIndex)
    if (!currentTask) {
        throw new Error('currentTask is undefined')
    }
    /* get the current task status */
    const currentTaskStatus = state.progress.currentTaskStatus
    if (!currentTaskStatus) {
        throw new Error('currentTaskStatus is undefined')
    }
    /* get the number of groups */
    if (currentTaskStatus === TaskStatus.LEFT_SCORES) {
        return currentTask.leftOption.groupsNames.length
    }
    if (currentTaskStatus === TaskStatus.RIGHT_SCORES) {
        return currentTask.rightOption.groupsNames.length
    }
    throw new Error('currentTaskStatus is not LEFT_SCORES or RIGHT_SCORES')
}

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

export default function Scores() {
    const taskStatus = useAppSelector(getCurrentTaskStatus)
    const totalNumberOfGroupsInOption = useAppSelector(getNumberOfGroups)
    const dispatch = useAppDispatch()
    const [currentGroupIndex, setCurrentGroupIndex] = useState<number>(0)
    const currentTaskMeta = useAppSelector(getCurrentTaskMeta)

    function getCurrentFocusedGroupName() {
        if (taskStatus === TaskStatus.LEFT_SCORES) {
            return currentTaskMeta.leftOption.groupsNames[currentGroupIndex]
        }
        if (taskStatus === TaskStatus.RIGHT_SCORES) {
            return currentTaskMeta.rightOption.groupsNames[currentGroupIndex]
        }
        throw new Error('currentTaskStatus is not LEFT_SCORES or RIGHT_SCORES')
    }

    function onScoreFinished(score: ScoreType) {
        /* add score to current task result */
        if (taskStatus === TaskStatus.LEFT_SCORES) {
            dispatch(addCurrentTaskLeftScore(score))
        }
        if (taskStatus === TaskStatus.RIGHT_SCORES) {
            dispatch(addCurrentTaskRightScore(score))
        }
        /* if there are more groups, go to the next group */
        if (currentGroupIndex < totalNumberOfGroupsInOption - 1) {
            setCurrentGroupIndex(currentGroupIndex + 1)
            return
        }
        /* if there are no more groups, finish scoring */
        setCurrentGroupIndex(0)
        if (taskStatus === TaskStatus.LEFT_SCORES) {
            dispatch(finishLeftOptionScoring())
            return
        }
        if (taskStatus === TaskStatus.RIGHT_SCORES) {
            dispatch(finishRightOptionScoring())
            return
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row  items-stretch justify-evenly mb-10">
                {/*left option */}
                <Option
                    optionName={currentTaskMeta.leftOption.optionName}
                    optionColor={currentTaskMeta.leftOption.optionColor}
                >
                    {
                        currentTaskMeta.leftOption.groupsNames.map((groupName, index) => {
                            return (
                                <Group
                                    focused={taskStatus === TaskStatus.LEFT_SCORES && index === currentGroupIndex}
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
                >
                    {
                        currentTaskMeta.rightOption.groupsNames.map((groupName, index) => {
                            return (
                                <Group
                                    focused={taskStatus === TaskStatus.RIGHT_SCORES && index === currentGroupIndex}
                                    key={index}
                                    groupName={groupName}
                                />
                            )
                        })
                    }
                </Option>
            </div>
            <Score onScoreFinished={onScoreFinished} currentFocusedGroupName={getCurrentFocusedGroupName()}/>
        </div>
    )
}

enum ScoreStatus {
    SCORE,
    CONFIDENCE
}

function Score({onScoreFinished, currentFocusedGroupName}: {
    onScoreFinished: (score: ScoreType) => void,
    currentFocusedGroupName: string
}) {
    const [scoreValue, setScoreValue] = useState<number | null>(null)
    const [confidence, setConfidence] = useState<number | null>(null)
    const [scoreStatus, setScoreStatus] = useState<ScoreStatus>(ScoreStatus.SCORE)

    function onSubmitted() {
        const score: ScoreType = {
            value     : scoreValue ?? 0,
            confidence: confidence ?? 0
        }
        /* reset the score */
        setScoreValue(null)
        setConfidence(null)
        /* set the score status to score */
        setScoreStatus(ScoreStatus.SCORE)

        /* call the callback */
        onScoreFinished(score)
    }

    if (scoreStatus === ScoreStatus.SCORE) {
        return (
            <div className="flex flex-col gap-5">
                {/*instructions*/}
                <h1 className="text-2xl font-bold text-center text-black">
                    {`please rate the performance of the group "${currentFocusedGroupName}"`}
                </h1>

                {/*score silder*/}
                <div className="flex flex-col gap-5 text-center text-black mb-3">
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={scoreValue ?? 0}
                        onChange={(event) => setScoreValue(parseInt(event.target.value))}
                    />
                    <span className="text-2xl font-bold">{scoreValue ?? 0}%</span>
                </div>
                {/*submit button*/}
                <div className="flex flex-col gap-5 text-center mb-3">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                            setScoreStatus(ScoreStatus.CONFIDENCE)
                        }}
                    >
                        submit
                    </button>
                </div>
            </div>
        )
    }
    if (scoreStatus === ScoreStatus.CONFIDENCE) {
        return (
            <div className="flex flex-col gap-5">
                {/*instructions*/}
                <h1 className="text-2xl font-bold text-center text-black">
                    {`how confident are you in your rating of the group "${currentFocusedGroupName}"?`}
                </h1>

                {/*score silder*/}
                <div className="flex flex-col gap-5 text-center text-black mb-3">
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={confidence ?? 0}
                        onChange={(event) => setConfidence(parseInt(event.target.value))}
                    />
                    <span className="text-2xl font-bold">{confidence ?? 0}%</span>
                </div>

                {/*submit button*/}
                <div className="flex flex-col gap-5 text-center mb-3">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onSubmitted}
                    >
                        submit
                    </button>
                </div>
            </div>
        )
    }
    return null
}