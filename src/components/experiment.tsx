'use client'
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../libs/redux/hooks";
import {initializeExperiment} from "../../libs/redux/features/experiment/experimentActions";
import Loader from "@components/experimentSteps/loader";
import {ExperimentStep} from "../../libs/redux/features/experiment/experimentSlice";
import Welcome from "@components/experimentSteps/welcome";
import Consent from "@components/experimentSteps/consent";
import ExperimentInstructions from "@components/experimentSteps/experimentInstructions";
import Task from "@components/task";
import Form from "@components/experimentSteps/form";


const Experiment = (props: { prolificid: string }) => {
    const dispatch = useAppDispatch()
    const experimentStep = useAppSelector(state => state.experiment.experimentStep)
    const [screenSizeError, setScreenSizeError] = useState<boolean>(false)
    useEffect(() => {
        const res = fetch('/api/experiment', {
            headers: {
                "prolificid": props.prolificid
            }
        })
            .then(res => res.json())
            .then(res => {
                /* set experiment metadata */
                dispatch(initializeExperiment(res))
            })
    }, [])
    // useEffect(() => {
    //     window.addEventListener('resize', () => {
    //         if (window.innerWidth < 1024) {
    //             setScreenSizeError(true)
    //         } else {
    //             setScreenSizeError(false)
    //         }
    //     })
    // }, [])
    // if (screenSizeError) {
    //     return (
    //         <div className="flex flex-col justify-center items-center bg-white min-h-screen">
    //             <h1 className="text-4xl font-bold text-slate-700">Please adjust your browser to a full screen display.</h1>
    //         </div>
    //     )
    // }
    if (experimentStep === ExperimentStep.LOADING) {
        return <Loader/>
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
    if (experimentStep === ExperimentStep.FORM) {
        return <Form/>
    }
    return null
}

export default Experiment