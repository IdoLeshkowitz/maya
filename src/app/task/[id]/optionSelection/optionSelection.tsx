'use client'

import {useReducer} from "react";
import {useParams, useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {Prisma} from ".prisma/client";
import Board from "@components/board";
import Header from "@components/header";
import Slider from "@components/slider";
import CommonLayout from "@components/commonLayout";
import {CommonButton} from "@components/button";
import Loader from "@components/experimentSteps/loader";
import {OptionSelection} from "@/types/taskResult";
import TaskUpdateInput = Prisma.TaskUpdateInput;

enum OptionSelectionSteps {
    SELECT_SIDE,
    SET_CONDFIDENCE,
}

interface State {
    step: OptionSelectionSteps
    selectedSide: "LEFT" | "RIGHT" | null
    confidence: number | null
}

const initialState: State = {
    step: OptionSelectionSteps.SELECT_SIDE,
    selectedSide: null,
    confidence: null,
}

enum ActionType {
    SET_CONFIDENCE,
    SET_SELECTED_SIDE,
    FINISH_STEP,
    SET_MUTATION_STATUS,
}

type Action =
    { action: ActionType.SET_CONFIDENCE, payload: number } |
    { action: ActionType.SET_SELECTED_SIDE, payload: "LEFT" | "RIGHT" } |
    { action: ActionType.FINISH_STEP } |
    { action: ActionType.SET_MUTATION_STATUS, payload: "idle" | "loading" | "success" | "error" }

function reducer(state: State, action: Action): State {
    if (action.action === ActionType.SET_CONFIDENCE) {
        return {...state, confidence: action.payload}
    }
    if (action.action === ActionType.SET_SELECTED_SIDE) {
        return {...state, selectedSide: action.payload}
    }
    if (action.action === ActionType.FINISH_STEP) {
        if (state.step === OptionSelectionSteps.SELECT_SIDE) {
            return {...state, step: OptionSelectionSteps.SET_CONDFIDENCE}
        }
    }
    return state
}

export default function OptionSelection() {
    const {id: taskId}: { id: string } = useParams()
    const [state, dispatch] = useReducer(reducer, initialState)
    const router = useRouter()
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
            router.replace(`/task/${taskId}/groupScoring`)
        }
    })

    function onSubmitted() {
        if (state.selectedSide === null || state.confidence === null) {
            return
        }
        const optionSelection: OptionSelection = {
            selectedSide: state.selectedSide,
            confidence: state.confidence
        }
        taskMutation.mutate({
            id: taskId,
            optionSelection: JSON.stringify(optionSelection)
        })
    }

    if (!taskMutation.isIdle) {
        return <Loader></Loader>
    }
    if (state.step === OptionSelectionSteps.SELECT_SIDE) {
        return (
            <Board
                taskId={taskId}
                header={
                    <Header centered={true}>
                        Based on your observations, which portfolio performed better?<br/>
                        Click on the name of the portfolio that performed better.
                    </Header>
                }
                onOptionSelected={(side) => {
                    dispatch({action: ActionType.SET_SELECTED_SIDE, payload: side})
                    dispatch({action: ActionType.FINISH_STEP})
                }}
            >
            </Board>
        )
    }
    if (state.step === OptionSelectionSteps.SET_CONDFIDENCE) {
        return (
            <CommonLayout
                footer={
                    <div className="flex justify-center items-center">
                        <CommonButton
                            onClick={() => {
                                onSubmitted()
                            }}
                            disabled={state.confidence === null}
                        >
                            Next
                        </CommonButton>
                    </div>
                }
            >
                <div className="flex flex-col justify-evenly items-center px-20">
                    <p className="text-black text-base">
                        How confident are you in your selection, on a scale of 0-100, where 0 is not confident at all
                        and 100 is extremely confident?
                    </p>
                    {/*{/!*confidence slider*!/}*/}
                    <Slider
                        value={state.confidence ?? undefined}
                        onChange={(value) => {
                            dispatch({action: ActionType.SET_CONFIDENCE, payload: value})
                        }}
                    />
                </div>
            </CommonLayout>
        )
    }
    return null
}
