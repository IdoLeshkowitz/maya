'use client'
import {FC, useEffect, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../libs/redux/hooks";
import Consent from "@components/experimentSteps/consent";
import {TaskMeta} from "@/types/taskMeta";
import {ExperimentMeta} from "@/types/experimentMeta";
import {fetchExperimentMetaSuccess, fetchTaskMetaSuccess} from "../../libs/redux/features/api/apiActions";
import {ExperimentStep} from "../../libs/redux/features/experiment/experimentSlice";
import Welcome from "@components/experimentSteps/welcome";
import ExperimentInstructions from "@components/experimentSteps/experimentInstructions";
import Task from "@components/task";
import logUpdate from "log-update";

interface ExperimentProps {
    experimentMetadataStringify: string
    tasksMetadataStringify: string
}

const Experiment: FC<ExperimentProps> = ({tasksMetadataStringify, experimentMetadataStringify}) => {
    const dispatch = useAppDispatch()
    const experimentStep = useAppSelector(state => state.experiment.experimentStep)
    const tasksMetadata: TaskMeta[] = useMemo(() => JSON.parse(tasksMetadataStringify), [tasksMetadataStringify])
    const experimentMetadata: ExperimentMeta = useMemo(() => JSON.parse(experimentMetadataStringify), [experimentMetadataStringify])
    const [screenSizeError, setScreenSizeError] = useState<boolean>(false)
    useEffect(() => {
        if (experimentMetadata) {
            dispatch(fetchExperimentMetaSuccess(experimentMetadata))
        }
        if (tasksMetadata) {
            dispatch(fetchTaskMetaSuccess(tasksMetadata))
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth < 1024) {
                setScreenSizeError(true)
            } else {
                setScreenSizeError(false)
            }
        })
    }, [])
    if (screenSizeError) {
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold">Please visit the website on a desktop computer.</h1>
            </div>
        )
    }
    if (experimentStep === ExperimentStep.IDLE) {
        return <Welcome/>
    }
    if (experimentStep === ExperimentStep.CONSENT) {
        return <Consent/>
    }
    if (experimentStep === ExperimentStep.INTRO) {
        return <ExperimentInstructions/>
    }
    if (experimentStep === ExperimentStep.TASKS) {
        return <Task/>
    }
    return null
}

export default Experiment