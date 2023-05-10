import {FC, useEffect, useState} from "react";
import Group from "@components/group";
import Option from "@components/option";
import {useAppDispatch, useAppSelector} from "../../libs/redux/hooks";
import {TaskStatus} from "../../libs/redux/features/progress/progressSlice";
import {RootState} from "../../libs/redux/store";
import {Snapshot, SnapshotIndicator} from "@/types/preview";
import {finishLeftPreview, finishRightPreview} from "../../libs/redux/features/userGesture/userGestureActions";

function getCurrentTaskStatus(state: RootState) {
    const currentTaskStatus = state.progress.currentTaskStatus
    if (currentTaskStatus === null) {
        throw new Error('currentTaskIndex is undefined')
    }
    return currentTaskStatus as TaskStatus
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

const Preview: FC = () => {
    const dispatch = useAppDispatch()
    const [currentActiveSnapshot, setCurrentActiveSnapshot] = useState<Snapshot | null>(null)
    const currentTaskStatus = useAppSelector(getCurrentTaskStatus)
    const currentTaskMeta = useAppSelector(getCurrentTaskMeta)
    useEffect(() => {
        if (currentTaskStatus === TaskStatus.LEFT_PREVIEW) {
            const leftSnapshots = [...currentTaskMeta.preview.leftSnapshots]
            for (let i = 0; i < leftSnapshots.length + 1; i++) {
                const currentSnapshot = leftSnapshots[i]
                setTimeout(() => {
                    if (!currentSnapshot) {
                        setCurrentActiveSnapshot(null)
                        setTimeout(() => {
                            dispatch(finishLeftPreview())
                        }, 1)
                        return
                    }
                    /* set loading snapshot will appear for 2 sec*/
                    setCurrentActiveSnapshot({
                        groupIndex: currentSnapshot.groupIndex,
                        label     : '',
                        indicator : SnapshotIndicator.LOADING,
                    })
                    /* set real snapshot will appear for 1 sec */
                    setTimeout(() => {
                        setCurrentActiveSnapshot({
                            ...currentSnapshot,
                        })
                    }, 2000)
                }, i * 3000)
            }
        }
        if (currentTaskStatus === TaskStatus.RIGHT_PREVIEW) {
            const rightSnapshots = [...currentTaskMeta.preview.rightSnapshots]
            for (let i = 0; i < rightSnapshots.length + 1; i++) {
                const currentSnapshot = rightSnapshots[i]
                setTimeout(() => {
                    if (!currentSnapshot) {
                        setCurrentActiveSnapshot(null)
                        setTimeout(() => {
                            dispatch(finishRightPreview())
                        }, 1)
                        return
                    }
                    /* set loading snapshot will appear for 2 sec*/
                    setCurrentActiveSnapshot({
                        groupIndex: currentSnapshot.groupIndex,
                        label     : '',
                        indicator : SnapshotIndicator.LOADING,
                    })
                    /* set real snapshot will appear for 1 sec */
                    setTimeout(() => {
                        setCurrentActiveSnapshot({
                            ...currentSnapshot,
                        })
                    }, 2000)
                }, i * 3000)
            }
        }
    }, [currentTaskStatus])
    return (
        <div className="flex flex-col gap-5">
            {/*current label*/}
            <div className="flex flex-col items-center justify-center">
                <h1 className="font-bold text-black text-center h-10">{currentActiveSnapshot?.label}</h1>
            </div>

            <div className="flex flex-row  items-stretch justify-evenly">
                {/*left option */}
                <Option
                    optionName={currentTaskMeta.leftOption.optionName}
                    optionColor={currentTaskMeta.leftOption.optionColor}
                >
                    {
                        currentTaskMeta.leftOption.groupsNames.map((groupName, index) => {
                            function isSnapshot() {
                                return currentTaskStatus === TaskStatus.LEFT_PREVIEW && currentActiveSnapshot?.groupIndex === index
                            }

                            return (
                                <Group
                                    snapshot={isSnapshot() ? currentActiveSnapshot : null}
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
                            function isSnapshot() {
                                if (currentActiveSnapshot === null) {
                                    return false
                                }
                                if (currentTaskStatus === TaskStatus.LEFT_PREVIEW) {
                                    return false
                                }
                                return currentActiveSnapshot.groupIndex === index
                            }

                            return (
                                <Group
                                    snapshot={isSnapshot() ? currentActiveSnapshot : null}
                                    key={index}
                                    groupName={groupName}
                                />
                            )
                        })
                    }
                </Option>
            </div>
        </div>
    )

}
export default Preview
