'use client'
import {Inter} from 'next/font/google'
import Experiment from "@components/experiment";
import ReduxProvider from "@components/reduxProvider";
import {Experiment as ExperimentType} from "@/types/experiment";
import {useEffect} from "react";
import {useAppDispatch} from "../../libs/redux/hooks";
import {initializeExperiment} from "../../libs/redux/features/experiment/experimentActions";

const inter = Inter({subsets: ['latin']})
export default function Home(props: { searchParams: { external_id: string } }) {
    if (!props.searchParams.external_id) {
        return (
            <div className="flex flex-col justify-center items-center bg-white min-h-screen">
                <h1 className="text-4xl font-bold text-slate-700">Please use the link provided in the Prolific study.</h1>
            </div>
        )
    }
    return (
        <ReduxProvider>
            <Experiment
                prolificid={props.searchParams.external_id}
            />
        </ReduxProvider>
    )
}

export const dynamic = 'force-dynamic'
