import {getAllExperimentMeta} from "@services/experimentMetaService";
import {getAllExperiments} from "@services/experimentService";

const columns = [
    "experiment_id",
    "variant_name",
    "experiment_name",
    "experiment_version",
    "tasks_ids",
    "prolific_id",
    "personal_details_id",
];

export default async function AdminExperimentPage() {
    const allExperiment = await getAllExperiments()
    const allExperimentMeta = await getAllExperimentMeta()
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
                    {allExperiment.map((experiment) => {
                        const experimentMeta = allExperimentMeta.find((meta) => meta._id?.toString() === experiment.experimentMetaId?.toString())
                        return (
                            <tr key={experiment._id?.toString()}>
                                <td className="border border-slate-500">{experiment._id?.toString()}</td>
                                <td className="border border-slate-500">{experimentMeta?.config.variantName}</td>
                                <td className="border border-slate-500">{experimentMeta?.config.experimentName}</td>
                                <td className="border border-slate-500">{experimentMeta?.config.experimentVersion}</td>
                                <td className="border border-slate-500">{experimentMeta?.tasksIds?.map(taskId => taskId.toString()).toString()}</td>
                                <td className="border border-slate-500">{experimentMeta?.prolificId}</td>
                                <td className="border border-slate-500">{experiment.personalDetailsId?.toString()}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}
export const revalidate = 60 ;