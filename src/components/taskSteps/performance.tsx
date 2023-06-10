import {FC, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../libs/redux/hooks";
import {RootState} from "../../../libs/redux/store";
import {Snapshot, SnapshotIndicator} from "@/types/preview";
import Board from "@components/board";
import {CommonButton} from "@components/button";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
import {Headers} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import Header from "@components/header";

enum SnapshotStep {
    IDLE,
    LOADER,
    SNAPSHOT,
}

function getCurrentTaskMeta(state: RootState) {
    return state.tasks.tasksStates.at(state.tasks.currentTaskIndex!)!.taskMeta
}

function getCurrentSnapshot(state: RootState) {
    const currentSnapshotIndex = state.tasks.tasksStates.at(state.tasks.currentTaskIndex!)!.currentSnapshotIndex!
    const allSnapshots = getCurrentTaskMeta(state).performance.snapshots
    return allSnapshots.at(currentSnapshotIndex)!
}

const Performance: FC = () => {
    const dispatch = useAppDispatch()
    const [currentSnapshotStep, setCurrentSnapshotStep] = useState(SnapshotStep.IDLE)
    let currentSnapshot: Snapshot | undefined = useAppSelector(getCurrentSnapshot)
    return (
        <>
            {/*board*/}
            <Board
                header={<Header centered={true}>{currentSnapshot.label}</Header>}
                snapshot={
                    currentSnapshotStep === SnapshotStep.SNAPSHOT ? currentSnapshot : currentSnapshotStep === SnapshotStep.LOADER ?
                        {...currentSnapshot, indicator: SnapshotIndicator.LOADING} : undefined}
                taskMeta={useAppSelector(getCurrentTaskMeta)}
            >
                {
                    currentSnapshotStep === SnapshotStep.IDLE &&
                    <div className="flex items-center justify-center">
                        <CommonButton
                            onClick={() => {
                                /* show loader for 1s */
                                setCurrentSnapshotStep(SnapshotStep.LOADER)
                                /* then show snapshot for another sec */
                                setTimeout(() => {
                                    setCurrentSnapshotStep(SnapshotStep.SNAPSHOT)
                                }, 500)
                                /* then go to next step */
                                setTimeout(() => {
                                    setTimeout(() => {
                                        dispatch(stepForward())
                                    }, 1)
                                    setCurrentSnapshotStep(SnapshotStep.IDLE)
                                }, 1000)
                            }}
                        >
                            Next
                        </CommonButton>
                    </div>
                }
            </Board>
        </>
    )

}
export default Performance
