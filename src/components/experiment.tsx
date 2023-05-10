'use client'
import {FC, useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../libs/redux/hooks";
import {TaskMeta} from '@/types/taskMeta'
import {ExperimentMeta} from "@/types/experimentMeta";
import {ExperimentStatus} from "../../libs/redux/features/progress/progressSlice";
import Instructions from "@components/instructions";
import {setExperimentMeta} from "../../libs/redux/features/experimentMeta/experimentMetaActions";
import {setTasksMeta} from "../../libs/redux/features/tasksMeta/tasksMetaActions";
import {startInstructions} from "../../libs/redux/features/userGesture/userGestureActions";
import Task from "@components/task";

interface ExperimentProps {
    experimentMetadataStringify: string
    tasksMetadataStringify: string
}

const Experiment: FC<ExperimentProps> = ({tasksMetadataStringify, experimentMetadataStringify}) => {
    const dispatch = useAppDispatch()
    const experimentStatus = useAppSelector(state => state.progress.experimentStatus)
    const currentTaskIndex = useAppSelector(state => state.progress.currentTaskIndex)
    const tasksMetadata: TaskMeta[] = useMemo(() => JSON.parse(tasksMetadataStringify), [tasksMetadataStringify])
    const experimentMetadata: ExperimentMeta = useMemo(() => JSON.parse(experimentMetadataStringify), [experimentMetadataStringify])
    useEffect(() => {
        if (experimentMetadata) {
            dispatch(setExperimentMeta(experimentMetadata))
        }
        if (tasksMetadata) {
            dispatch(setTasksMeta(tasksMetadata))
        }
    }, [dispatch, experimentMetadata, tasksMetadata])
    if (experimentStatus === ExperimentStatus.IDLE) {
        return (
            <div className="flex flex-col justify-center items-center relative m-3.5 gap-3">
                {/*start button*/}
                <button
                    onClick={() => dispatch(startInstructions())}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:bg-blue-700"
                >
                    Start
                </button>
            </div>
        )
    }
    if (experimentStatus === ExperimentStatus.INSTRUCTIONS) {
        return <Instructions/>
    }
    if (experimentStatus === ExperimentStatus.TASKS) {
        return <Task/>
    }
    return null
}

export default Experiment