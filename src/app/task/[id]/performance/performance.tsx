"use client"
import {FC, useCallback, useMemo, useReducer} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {TaskReturnType} from "@/app/api/task/[id]/route";
import {Option as OptionType} from "@/types/option";
import {SnapshotIndicator} from "@/types/performance";
import {useRouter} from "next/navigation";
import Board from "@components/board";
import Header from "@components/header";
import {CommonButton, CommonButtonLink} from "@components/button";

enum SnapshotState {
    IDLE,
    LOADER,
    SNAPSHOT,
}

type PerformanceSide = "LEFT" | "RIGHT"

interface PerformanceProps {
    taskId: string
}

interface State {
    currentSnapshotState: SnapshotState
    snapshotIndex: number
    optionSide: PerformanceSide
    finished: boolean
}

const initialState: State = {
    currentSnapshotState: SnapshotState.IDLE,
    snapshotIndex: 0,
    optionSide: "LEFT",
    finished: false
}

enum ActionType {
    FINISH_SNAPSHOT,
    SET_SNAPSHOT_STATE,
}

type Action =
    { type: ActionType.FINISH_SNAPSHOT } |
    { type: ActionType.SET_SNAPSHOT_STATE, payload: SnapshotState }
const Performance: FC<PerformanceProps> = (props) => {
    const router = useRouter()
    const queryClient = useQueryClient()
    const {data} = useQuery<TaskReturnType>(['task', props.taskId], () => fetch(`/api/task/${props.taskId}`).then(res => res.json()), {
        suspense: true,
    })

    const leftOption = useMemo(() => {
        if (!data) {
            return null
        }
        const leftOption = data.leftOption as any
        return {...leftOption, performance: JSON.parse(leftOption["performance"])} as OptionType
    }, [data])
    const rightOption = useMemo(() => {
        if (!data) {
            return null
        }
        const rightOption = data.rightOption as any
        return {...rightOption, performance: JSON.parse(rightOption["performance"])} as OptionType
    }, [data])

    const reducer = useCallback((state: State, action: Action): State => {
        if (action.type === ActionType.FINISH_SNAPSHOT) {
            if (state.optionSide === "LEFT") {
                if (leftOption?.performance.snapshots && state.snapshotIndex < leftOption?.performance.snapshots.length - 1) {
                    return {
                        ...state,
                        snapshotIndex: state.snapshotIndex + 1,
                        currentSnapshotState: SnapshotState.IDLE
                    }
                } else {
                    return {
                        ...state,
                        snapshotIndex: 0,
                        optionSide: "RIGHT",
                        currentSnapshotState: SnapshotState.IDLE
                    }
                }
            } else {
                if (rightOption?.performance.snapshots && state.snapshotIndex < rightOption?.performance.snapshots.length - 1) {
                    return {
                        ...state,
                        snapshotIndex: state.snapshotIndex + 1,
                        currentSnapshotState: SnapshotState.IDLE
                    }
                } else {
                    return {
                        ...state,
                        finished: true,
                        currentSnapshotState: SnapshotState.IDLE
                    }
                }
            }
        }
        if (action.type === ActionType.SET_SNAPSHOT_STATE) {
            return {
                ...state,
                currentSnapshotState: action.payload
            }
        }
        return state
    }, [leftOption?.performance.snapshots, rightOption?.performance.snapshots])
    const [state, dispatch] = useReducer(reducer, initialState)

    const currentSnapshot = useMemo(() => {
        let output;
        if (state.currentSnapshotState === SnapshotState.IDLE) {
            return undefined
        }
        if (state.optionSide === "LEFT") {
            output = {...leftOption?.performance?.snapshots[state.snapshotIndex]!, optionSide: "LEFT" as PerformanceSide}
        } else {
            output = {...rightOption?.performance?.snapshots[state.snapshotIndex]!, optionSide: "RIGHT" as PerformanceSide}
        }
        if (state.finished) {
            return undefined
        }
        if (state.currentSnapshotState === SnapshotState.LOADER) {
            output = {...output, indicator: SnapshotIndicator.LOADING}
        }
        return output
    }, [leftOption?.performance?.snapshots, rightOption?.performance?.snapshots, state])


    return (
        <>
            <Board
                header={<Header centered={true}>{currentSnapshot?.label}</Header>}
                snapshot={currentSnapshot}
                taskId={props.taskId}
            >
                {
                    state.currentSnapshotState === SnapshotState.IDLE &&
                    <div className="flex items-center justify-center">
                        {
                            state.finished ?
                                <CommonButtonLink
                                    href={`/task/${props.taskId}/optionSelection`}
                                >
                                    Finish
                                </CommonButtonLink>
                                :
                                <CommonButton
                                    onClick={() => {
                                        /* show loader for 1s */
                                        dispatch({
                                            type: ActionType.SET_SNAPSHOT_STATE,
                                            payload: SnapshotState.LOADER
                                        })
                                        /* then show snapshot for another sec */
                                        setTimeout(() => {
                                            dispatch({
                                                type: ActionType.SET_SNAPSHOT_STATE,
                                                payload: SnapshotState.SNAPSHOT
                                            })
                                        }, 500)
                                        /* then go to next step */
                                        setTimeout(() => {
                                            dispatch({type: ActionType.FINISH_SNAPSHOT})
                                        }, 1000)
                                    }}
                                >
                                    Next
                                </CommonButton>
                        }

                    </div>
                }
            </Board>
        </>
    )

}
export default Performance
