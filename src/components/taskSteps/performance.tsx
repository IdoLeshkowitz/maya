import {FC, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../libs/redux/hooks";
import {RootState} from "../../../libs/redux/store";
import {Snapshot} from "@/types/performance";
import Board from "@components/board";
import {CommonButton} from "@components/button";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";

enum PerformanceStep {
    IDLE,
    LEFT_PERFORMANCE,
    RIGHT_PERFORMANCE,
    FINISHED
}

function getCurrentTaskMeta(state: RootState) {
    return state.tasks.allTasks.at(state.tasks.currentTaskIndex!)!.taskMeta
}

const Performance: FC = () => {
    const dispatch = useAppDispatch()
    const [performanceStep, setPerformanceStep] = useState<PerformanceStep>(PerformanceStep.IDLE)
    const [currentSnapshotIndex, setCurrentSnapshotIndex] = useState<number | null>(null)
    const [showSnapshot, setShowSnapshot] = useState<boolean>(true)
    const currentTaskMeta = useAppSelector(getCurrentTaskMeta)
    const leftSnapshots: Snapshot[] = useMemo(() => {
        return currentTaskMeta.performance.leftOption.snapshots
    }, [currentTaskMeta.performance.leftOption.snapshots])
    const rightSnapshots: Snapshot[] = useMemo(() => {
        return currentTaskMeta.performance.rightOption.snapshots
    }, [currentTaskMeta.performance.rightOption.snapshots])

    function next() {
        /* if not showing snapshot, show snapshot */
        if (!showSnapshot) {
            setShowSnapshot(true)
            return
        }
        /* if performance step is idle, go to left performance, set index to 0 */
        if (performanceStep === PerformanceStep.IDLE) {
            setShowSnapshot(false)
            setPerformanceStep(PerformanceStep.LEFT_PERFORMANCE)
            setCurrentSnapshotIndex(0)
            return
        }
        /* if performance step is left */
        if (performanceStep === PerformanceStep.LEFT_PERFORMANCE) {
            /* if there are no more snapshots, move to right performance  */
            if (currentSnapshotIndex! >= leftSnapshots.length - 1) {
                /* set performance step to right */
                setPerformanceStep(PerformanceStep.RIGHT_PERFORMANCE)
                /* set show snapshot to false */
                setShowSnapshot(false)
                /* set index to 0 */
                setCurrentSnapshotIndex(0)
                return
            }
            /* if there are more snapshots, go to the next snapshot */
            /* set show snapshot to false */
            setShowSnapshot(false)
            /* set index to 0 */
            setCurrentSnapshotIndex(currentSnapshotIndex! + 1)
        }
        /* if performance step is right */
        if (performanceStep === PerformanceStep.RIGHT_PERFORMANCE) {
            /* if there are no more snapshots, finish performance */
            if (currentSnapshotIndex! >= rightSnapshots.length - 1) {
                /* set performance step to finished */
                dispatch(stepForward())
                return
            }
            /* if there are more snapshots, go to the next snapshot */
            /* set show snapshot to false */
            setShowSnapshot(false)
            /* set index to 0 */
            setCurrentSnapshotIndex(currentSnapshotIndex! + 1)
        }
    }

    const currentActiveSnapshot = useMemo(() => {
        if (performanceStep === PerformanceStep.LEFT_PERFORMANCE) {
            return leftSnapshots[currentSnapshotIndex!]
        }
        if (performanceStep === PerformanceStep.RIGHT_PERFORMANCE) {
            return rightSnapshots[currentSnapshotIndex!]
        }
        return null
    }, [performanceStep, currentSnapshotIndex, leftSnapshots, rightSnapshots])
    return (
        <>
            {/*board*/}
                <Board
                    title={currentActiveSnapshot?.label}
                    taskMeta={currentTaskMeta}
                    snapshot={currentActiveSnapshot ?
                        {
                            snapshot: {
                                groupIndex: currentActiveSnapshot.groupIndex,
                                label     : currentActiveSnapshot.label,
                                indicator : showSnapshot ? currentActiveSnapshot.indicator : 'loading'
                            },
                            side    : performanceStep === PerformanceStep.LEFT_PERFORMANCE ? 'left' : 'right'
                        }
                        : undefined}
                >
                    {/*next button*/}
                    <CommonButton onClick={next}>
                        Next
                    </CommonButton>
                </Board>
        </>
    )

}
export default Performance
