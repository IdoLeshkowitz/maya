'use client'
import {FC, useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../libs/redux/hooks";
import Consent from "@components/experimentSteps/consent";
import {TaskMeta} from "@/types/taskMeta";
import {ExperimentMeta} from "@/types/experimentMeta";
import {fetchExperimentMetaSuccess, fetchTaskMetaSuccess} from "../../libs/redux/features/api/apiActions";
import {ExperimentStep} from "../../libs/redux/features/experiment/experimentSlice";
import Welcome from "@components/experimentSteps/welcome";
import ExperimentInstructions from "@components/experimentSteps/experimentInstructions";
import Task from "@components/task";

interface ExperimentProps {
    experimentMetadataStringify: string
    tasksMetadataStringify: string
}

const Experiment: FC<ExperimentProps> = ({tasksMetadataStringify, experimentMetadataStringify}) => {
    const dispatch = useAppDispatch()
    const experimentStep = useAppSelector(state => state.experiment.experimentStep)
    const tasksMetadata: TaskMeta[] = useMemo(() => JSON.parse(tasksMetadataStringify), [tasksMetadataStringify])
    const experimentMetadata: ExperimentMeta = useMemo(() => JSON.parse(experimentMetadataStringify), [experimentMetadataStringify])
    useEffect(() => {
        if (experimentMetadata) {
            dispatch(fetchExperimentMetaSuccess(experimentMetadata))
        }
        if (tasksMetadata) {
            dispatch(fetchTaskMetaSuccess(tasksMetadata))
        }
    }, [])
    if (experimentStep === ExperimentStep.IDLE) {
        return <Welcome/>
    }
    if (experimentStep === ExperimentStep.CONSENT) {
        return <Consent/>
    }
    if (experimentStep === ExperimentStep.INSTRUCTIONS) {
        return <ExperimentInstructions/>
    }
    if (experimentStep === ExperimentStep.TASKS) {
        return <Task/>
    }
    return null
}

export default Experiment