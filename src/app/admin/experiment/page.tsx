import {getAllExperimentMeta} from "@services/experimentMetaService";
import {getAllExperiments} from "@services/experimentService";
import {Experiment} from "@/types/experiment";
import {ExperimentMeta} from "@/types/experimentMeta";
import {CsvLink} from "@components/CsvLink";

const columns = [
    "session_id",
    "variant_name",
    "experiment_name",
    "experiment_version",
    "tasks_ids",
    "prolific_id",
    "personal_details_id",
];

function getCsvData(allExperiments: Experiment[], allExperimentMeta: ExperimentMeta[]) {
    const csvData = allExperiments.map((experiment) => {
        const experimentMeta = allExperimentMeta.find((meta) => meta._id?.toString() === experiment.experimentMetaId?.toString())
        return {
            experiment_id      : experiment._id?.toString(),
            variant_name       : experimentMeta?.config.variantName,
            experiment_name    : experimentMeta?.config.experimentName,
            experiment_version : experimentMeta?.config.experimentVersion,
            tasks_ids          : experimentMeta?.tasksIds?.toString(),
            prolific_id        : experimentMeta?.prolificId?.toString(),
            personal_details_id: experiment.personalDetailsId?.toString(),
        }
    })
    return csvData
}

export default async function AdminExperimentPage() {
    const allExperiment = await getAllExperiments()
    const allExperimentMeta = await getAllExperimentMeta()
    return (
        <div className="min-h-screen bg-white min-w-max pt-5">
            <div className="mb-5">
                <CsvLink data={getCsvData(allExperiment, allExperimentMeta)}>Download Csv</CsvLink>
            </div>
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
export const revalidate = 60;