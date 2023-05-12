'use client'
import {FC, useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../libs/redux/hooks";
import {TaskMeta} from '@/types/taskMeta'
import {ExperimentMeta} from "@/types/experimentMeta";
import {ExperimentStatus} from "../../libs/redux/features/progress/progressSlice";
import Instructions from "@components/instructions";
import {setExperimentMeta} from "../../libs/redux/features/experimentMeta/experimentMetaActions";
import {setTasksMeta} from "../../libs/redux/features/tasksMeta/tasksMetaActions";
import {startExperiment, startInstructions} from "../../libs/redux/features/userGesture/userGestureActions";
import Task from "@components/task";

interface ExperimentProps {
    experimentMetadataStringify: string
    tasksMetadataStringify: string
}

const Experiment: FC<ExperimentProps> = ({tasksMetadataStringify, experimentMetadataStringify}) => {
    const dispatch = useAppDispatch()
    const experimentStatus = useAppSelector(state => state.progress.experimentStatus)
    const tasksMetadata: TaskMeta[] = useMemo(() => JSON.parse(tasksMetadataStringify), [tasksMetadataStringify])
    const experimentMetadata: ExperimentMeta = useMemo(() => JSON.parse(experimentMetadataStringify), [experimentMetadataStringify])
    useEffect(() => {
        if (experimentMetadata) {
            dispatch(setExperimentMeta(experimentMetadata))
        }
        if (tasksMetadata) {
            dispatch(setTasksMeta(tasksMetadata))
        }
        dispatch(startExperiment())
    }, [])
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
    if (experimentStatus === ExperimentStatus.RESULTS_PENDING) {
        // return loader
        return (
            <div className="flex flex-col justify-center items-center relative m-3.5 gap-3">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"/>
            </div>
        )
    }
    if (experimentStatus === ExperimentStatus.ENDED) {
        return (
            <div className="flex flex-col justify-center items-center relative m-3.5 gap-3">
                <h1 className="text-2xl font-bold text-center text-black">
                    Thank you for participating!
                </h1>
            </div>
        )
    }
    return null
}

export default Experiment