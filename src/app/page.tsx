import {Inter} from 'next/font/google'
import {generateExperiment} from "../../libs/services/experimentService";
import ReduxProvider from "@components/reduxProvider";
import Experiment from "@components/experiment";

const inter = Inter({subsets: ['latin']})

export default async function Home() {
    const {data: {tasks, experiment}} = await generateExperiment()
    return (
        <main className="flex min-h-screen flex-col items-stretch p-24 bg-amber-50">
            <ReduxProvider>
                <Experiment
                    tasksMetadataStringify={JSON.stringify(tasks)}
                    experimentMetadataStringify={JSON.stringify(experiment)}
                />
            </ReduxProvider>
        </main>
    )
}
