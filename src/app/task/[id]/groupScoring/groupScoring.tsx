'use client'
import {useParams, useRouter} from "next/navigation";
import {useMemo, useReducer} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Prisma} from ".prisma/client";
import Board from "@components/board";
import Header from "@components/header";
import Slider from "@components/slider";
import {CommonButton} from "@components/button";
import {TaskReturnType} from "@/app/api/task/[id]/route";
import {Option as OptionType} from "@/types/option";
import {SnapshotIndicator} from "@/types/performance";
import TaskUpdateInput = Prisma.TaskUpdateInput;

enum GroupScoringSteps {
    LEFT_OPTION_SCORING,
    RIGHT_OPTION_SCORING
}

interface Scores {
    left: number [],
    right: number []
}

interface State {
    step: GroupScoringSteps
    groupIndex: number
    leftScores: number[] | null
    rightScores: number[] | null
}

const initialState: State = {
    step: GroupScoringSteps.LEFT_OPTION_SCORING,
    leftScores: null,
    rightScores: null,
    groupIndex: 0
}

enum ActionType {
    SET_LEFT_SCORES,
    SET_RIGHT_SCORES,
    SET_STEP,
    SET_GROUP_INDEX
}

type Action =
    { action: ActionType.SET_LEFT_SCORES, payload: number[] } |
    { action: ActionType.SET_RIGHT_SCORES, payload: number[] } |
    { action: ActionType.SET_STEP, payload: GroupScoringSteps } |
    { action: ActionType.SET_GROUP_INDEX, payload: number }

function reducer(state: State, action: Action): State {
    if (action.action === ActionType.SET_LEFT_SCORES) {
        return {...state, leftScores: action.payload}
    }
    if (action.action === ActionType.SET_RIGHT_SCORES) {
        return {...state, rightScores: action.payload}
    }
    if (action.action === ActionType.SET_STEP) {
        return {...state, step: action.payload}
    }
    if (action.action === ActionType.SET_GROUP_INDEX) {
        return {...state, groupIndex: action.payload}
    }
    return state
}

export default function GroupScoring() {
    const {id: taskId}: { id: string } = useParams()
    const [state, dispatch] = useReducer(reducer, initialState)
    const router = useRouter()
    const queryClient = useQueryClient()
    const {data: taskData} = useQuery<TaskReturnType>(['task', taskId], () => fetch(`${process.env["NEXT_PUBLIC_BASE_URL"]}/api/task/${taskId}`).then(res => res.json()), {
        suspense: true,
    })
    const leftOption = useMemo(() => {
        if (!taskData) {
            return null
        }
        const leftOption = taskData.leftOption as any
        return {...leftOption, performance: JSON.parse(leftOption["performance"])} as OptionType
    }, [taskData])
    const rightOption = useMemo(() => {
        if (!taskData) {
            return null
        }
        const rightOption = taskData.rightOption as any
        return {...rightOption, performance: JSON.parse(rightOption["performance"])} as OptionType
    }, [taskData])
    const taskMutation = useMutation({
        mutationFn: (input: TaskUpdateInput) => {
            return fetch(`/api/task/${input.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(input)
            })
        },
        onSuccess: () => {
            router.push(`/task/${taskId}/finish`)
        }
    })
    const currentScore = useMemo(() => {
        if (state.step === GroupScoringSteps.LEFT_OPTION_SCORING) {
            return state.leftScores && state.leftScores[state.groupIndex]
        }
        if (state.step === GroupScoringSteps.RIGHT_OPTION_SCORING) {
            return state.rightScores && state.rightScores[state.groupIndex]
        }
        return null
    }, [state])

    function onNext() {
        if (state.step === GroupScoringSteps.LEFT_OPTION_SCORING) {
            if (state.leftScores && state.leftScores.length === leftOption?.groupsNames.length) {
                dispatch({action: ActionType.SET_GROUP_INDEX, payload: 0})
                dispatch({action: ActionType.SET_STEP, payload: GroupScoringSteps.RIGHT_OPTION_SCORING})
            } else {
                dispatch({action: ActionType.SET_GROUP_INDEX, payload: state.groupIndex + 1})
            }
        }
        if (state.step === GroupScoringSteps.RIGHT_OPTION_SCORING) {
            if (state.rightScores && state.rightScores.length === rightOption?.groupsNames.length) {
                taskMutation.mutate({
                    id: taskId,
                    leftScores: JSON.stringify(state.leftScores),
                    rightScores: JSON.stringify(state.rightScores)
                })
            } else {
                dispatch({action: ActionType.SET_GROUP_INDEX, payload: state.groupIndex + 1})
            }
        }
    }

    return (
        <Board
            snapshot={{
                groupIndex: state.groupIndex,
                indicator: SnapshotIndicator.NONE,
                optionSide: state.step === GroupScoringSteps.LEFT_OPTION_SCORING ? 'LEFT' : 'RIGHT',
            }}
            taskId={taskId}
            header={
                <Header>
                    Based on your observations, what was the performance of this industry on a scale of 0-100, where 0
                    is very bad and 100 is very good?
                </Header>
            }
        >
            <div className="flex flex-col self-stretch items-center justify-center gap-8">
                {/* slider */}
                <Slider
                    value={currentScore}
                    onChange={(score) => {
                        const action: ActionType = state.step === GroupScoringSteps.LEFT_OPTION_SCORING ?
                            ActionType.SET_LEFT_SCORES :
                            ActionType.SET_RIGHT_SCORES
                        const scores = state.step === GroupScoringSteps.LEFT_OPTION_SCORING ?
                            state.leftScores ?? [] :
                            state.rightScores ?? []
                        if (scores.at(state.groupIndex)) {
                            scores[state.groupIndex] = score
                        } else {
                            scores.push(score)
                        }
                        dispatch({
                            action,
                            payload: scores
                        })
                    }
                    }
                />
                {/*next button*/}
                <CommonButton
                    onClick={onNext}
                    disabled={(currentScore ?? false) === false ? true : undefined}
                >
                    Next
                </CommonButton>
            </div>
        </Board>
    )
}

