import {Inter} from 'next/font/google'
import ReduxProvider from "@components/reduxProvider";
import {randomizeTasksFromVariant} from "@/utils/randomizeTasksFromVariant";
import {TaskMeta} from "@/types/taskMeta";
import {Variant} from "@/types/variant";
import experimentConfig from "@public/experimentConfig.json";
import {insertOneExperiment} from "@services/experimentMetaService";
import {insertManyTaskMeta} from "@services/taskMetaService";
import {ExperimentMeta} from "@/types/experimentMeta";
import Experiment from "@components/experiment";

const inter = Inter({subsets: ['latin']})

export default async function Home() {
    /* generate tasks meta  */
    const tasksMeta = experimentConfig.variants.reduce((acc, variant: Variant) => {
        return acc.concat(randomizeTasksFromVariant(variant))
    }, [] as TaskMeta[])
    /* insert tasks meta to db*/
    const insertedTasksMetaResult = await insertManyTaskMeta(tasksMeta)
    /* insert experiment meta to db*/
    const insertedExperimentMetaResult = await insertOneExperiment({
        tasksIds: Object.values(insertedTasksMetaResult.insertedIds),
    })
    return (
        <main className="flex h-screen bg-white justify-center">
            <ReduxProvider>
                <Experiment
                    tasksMetadataStringify={JSON.stringify(tasksMeta.map((taskMeta, index) => {
                        return {
                            ...taskMeta,
                            _id: Object.values(insertedTasksMetaResult.insertedIds)[index]
                        }
                    }))}
                    experimentMetadataStringify={JSON.stringify({
                        tasksIds: Object.values(insertedTasksMetaResult.insertedIds),
                        _id     : insertedExperimentMetaResult.insertedId
                    } as ExperimentMeta)}
                />
            </ReduxProvider>
        </main>
    )
}

export const dynamic = 'force-dynamic'
