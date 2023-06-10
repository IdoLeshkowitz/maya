// @ts-ignore
import {getAllTasks} from "@services/taskServices";
import {getAllTasksMeta} from "@services/taskMetaService";
import {getAllTasksResult} from "@services/taskResultService";

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
    "order_in_experiment",
    "option_selected",
    "option_selection_confidence",
    "left_scores",
    "right_scores",
];
export default async function AdminTaskPage() {
    const [allTasks, allTasksMeta, allTasksResult] = await Promise.all([
        getAllTasks(),
        getAllTasksMeta(),
        getAllTasksResult()
    ])
    return (
        <div className="min-h-screen bg-white min-w-max">
            <table className="bg-white text-black  table-auto border border-slate-500 border-collapse">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th className="border border-slate-500" key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {allTasks.map((task) => {
                            const taskMeta = allTasksMeta.find((taskMeta) => taskMeta._id?.toString() === task.taskMetaId.toString());
                            const taskResult = allTasksResult.find((taskResult) => taskResult._id?.toString() === task.taskResultId?.toString());
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
                                    <td className="border border-slate-500">{taskMeta?.orderInExperiment}</td>
                                    <td className="border border-slate-500">{taskResult?.selectedOption?.selectedSide}</td>
                                    <td className="border border-slate-500">{taskResult?.selectedOption?.confidence}</td>
                                    <td className="border border-slate-500">{taskResult?.leftScores?.toString()}</td>
                                    <td className="border border-slate-500">{taskResult?.rightScores?.toString()}</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div>
    )
}