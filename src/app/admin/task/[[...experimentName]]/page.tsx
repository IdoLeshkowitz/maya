import {getAllExperimentMeta} from "@services/experimentMetaService";
import FilterTasks from "@/app/admin/task/[[...experimentName]]/filterTasks";
import client from "@client";
import {cache} from "react";
import {ObjectId} from "bson";
import {ExperimentMeta} from "@/types/experimentMeta";
import {Experiment} from "@/types/experiment";

const columns = [
    "task_id",
    "start_time",
    "end_time",
    "preview_name",
    "l_preview_group_name",
    "r_preview_group_name",
    "l_preview_simple_name",
    "r_preview_simple_name",
    "l_option_name",
    "r_option_name",
    "l_color",
    "r_color",
    "l1_name",
    "l2_name",
    "l3_name",
    "r1_name",
    "r2_name",
    "r3_name",
    "order_in_experiment",
    "option_selected",
    "option_selection_confidence",
    "l1_score",
    "l2_score",
    "l3_score",
    "r1_score",
    "r2_score",
    "r3_score",
    "belongs_to_session",
    "experiment_name",
];
const getAllExperimentNames = cache(async () => {
    const allExperimentsMeta = await getAllExperimentMeta()
    const experimentNames = allExperimentsMeta.map((experimentMeta) => experimentMeta.config.experimentName)
    return Array.from(new Set(experimentNames))
})
const findManyExperimentMetaByExperimentName = cache(async (experimentName: string): Promise<ExperimentMeta[]> => {
    try {
        await client.connect()
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection("experimentMeta")
        return await collection.find({'config.experimentName': experimentName}).toArray() as ExperimentMeta[]
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
})
const findManyExperimentsByExperimentMeta = cache(async (experimentMetaId: ObjectId[]): Promise<Experiment[]> => {
    try {
        await client.connect()
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection("experiment")
        return await collection.find({experimentMetaId: {$in: experimentMetaId}}).toArray() as Experiment[]
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
})
const findManyTasksById = cache(async (taskIds: ObjectId[]) => {
    try {
        await client.connect()
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection("task")
        return await collection.find({_id: {$in: taskIds}}).toArray()
    } catch (e) {
        console.log(e)
    }
})
const findManyTasksMetaById = cache(async (taskMetaIds: ObjectId[]) => {
    try {
        await client.connect()
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection("taskMeta")
        return await collection.find({_id: {$in: taskMetaIds}}).toArray()
    } catch (e) {
        console.log(e)
    }
})
const findManyTaskResultsById = cache(async (taskResultIds: ObjectId[]) => {
    try {
        await client.connect()
        const db = client.db(process.env.DB_NAME)
        const collection = db.collection("taskResults")
        return await collection.find({_id: {$in: taskResultIds}}).toArray()
    } catch (e) {
        console.log(e)
    }
})
export default async function AdminTaskPage(props: { params: { experimentName: string } }) {
    const experimentNames = await getAllExperimentNames()
    if (!props.params.experimentName) {
        return (
            <div className="min-h-screen bg-white min-w-max">
                <FilterTasks options={experimentNames}/>
            </div>
        )
    }
    const chosenExperimentName = decodeURIComponent(props.params.experimentName)
    const filteredExperimentsMeta = await findManyExperimentMetaByExperimentName(chosenExperimentName)
    const filteredExperiments = await findManyExperimentsByExperimentMeta(filteredExperimentsMeta!.map((experimentMeta) => experimentMeta._id!))
    const tasksIds = filteredExperimentsMeta!.map((experimentMeta) => experimentMeta.tasksIds).flat() as ObjectId[]
    const filteredTasks = await findManyTasksById(tasksIds)
    const filteredTasksMeta = await findManyTasksMetaById(filteredTasks!.map((task) => task.taskMetaId))
    const filteredTaskResults = await findManyTaskResultsById(filteredTasks!.map((task) => task.taskResultId))
    return (
        <div className="min-h-screen bg-white min-w-max">
            <FilterTasks options={experimentNames}/>
            <table className="bg-white text-black  table-auto border border-slate-500 border-collapse">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th className="border border-slate-500" key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks?.map((task) => {
                            const taskMeta = filteredTasksMeta?.find((taskMeta) => taskMeta._id?.toString() === task.taskMetaId?.toString());
                            const taskResult = filteredTaskResults?.find((taskResult) => taskResult._id?.toString() === task.taskResultId?.toString());
                            const experimentMeta = filteredExperimentsMeta?.find((experimentMeta) => experimentMeta.belongsToExperimentId?.toString() === task.belongsToExperimentId?.toString());
                            return (
                                <tr key={task._id?.toString()}>
                                    <td className="border border-slate-500">{task._id?.toString()}</td>
                                    <td className="border border-slate-500">{taskResult?.startTime}</td>
                                    <td className="border border-slate-500">{taskResult?.endTime}</td>
                                    <td className="border border-slate-500">{taskMeta?.performance.previewName}</td>
                                    <td className="border border-slate-500">{taskMeta?.performance.leftPreviewGroupName}</td>
                                    <td className="border border-slate-500">{taskMeta?.performance.rightPreviewGroupName}</td>
                                    <td className="border border-slate-500">{taskMeta?.performance.leftPreviewSimpleName}</td>
                                    <td className="border border-slate-500">{taskMeta?.performance.rightPreviewSimpleName}</td>
                                    <td className="border border-slate-500">{taskMeta?.leftOption.optionName}</td>
                                    <td className="border border-slate-500">{taskMeta?.rightOption.optionName}</td>
                                    <td className="border border-slate-500">{taskMeta?.leftOption.optionColor}</td>
                                    <td className="border border-slate-500">{taskMeta?.rightOption.optionColor}</td>
                                    <td className="border border-slate-500">{taskMeta?.leftOption.groupsNames[0]}</td>
                                    <td className="border border-slate-500">{taskMeta?.leftOption.groupsNames[1]}</td>
                                    <td className="border border-slate-500">{taskMeta?.leftOption.groupsNames[2]}</td>
                                    <td className="border border-slate-500">{taskMeta?.rightOption.groupsNames[0]}</td>
                                    <td className="border border-slate-500">{taskMeta?.rightOption.groupsNames[1]}</td>
                                    <td className="border border-slate-500">{taskMeta?.rightOption.groupsNames[2]}</td>
                                    <td className="border border-slate-500">{taskMeta?.orderInExperiment}</td>
                                    <td className="border border-slate-500">{taskResult?.optionSelection?.selectedSide}</td>
                                    <td className="border border-slate-500">{taskResult?.optionSelection?.confidence}</td>
                                    <td className="border border-slate-500">{taskResult?.leftScores?.at(0)?.toString()}</td>
                                    <td className="border border-slate-500">{taskResult?.leftScores?.at(1)?.toString()}</td>
                                    <td className="border border-slate-500">{taskResult?.leftScores?.at(2)?.toString()}</td>
                                    <td className="border border-slate-500">{taskResult?.rightScores?.at(0)?.toString()}</td>
                                    <td className="border border-slate-500">{taskResult?.rightScores?.at(1)?.toString()}</td>
                                    <td className="border border-slate-500">{taskResult?.rightScores?.at(2)?.toString()}</td>
                                    <td className="border border-slate-500">{experimentMeta?.belongsToExperimentId?.toString()}</td>
                                    <td className="border border-slate-500">{experimentMeta?.config?.experimentName}</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div>
    )
}
export const revalidate = 180;