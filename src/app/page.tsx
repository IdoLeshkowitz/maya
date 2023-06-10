'use client'
import {Inter} from 'next/font/google'
import Experiment from "@components/experiment";
import ReduxProvider from "@components/reduxProvider";
import {Experiment as ExperimentType} from "@/types/experiment";
import {useEffect} from "react";
import {useAppDispatch} from "../../libs/redux/hooks";
import {initializeExperiment} from "../../libs/redux/features/experiment/experimentActions";

const inter = Inter({subsets: ['latin']})
export default function Home(props: { searchParams: { prolificid: string } }) {
    return (
        <ReduxProvider>
            <Experiment
                prolificid={props.searchParams.prolificid}
            />
        </ReduxProvider>
    )
}

export const dynamic = 'force-dynamic'
