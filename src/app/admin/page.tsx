import {getAllTasksMeta, getAllTasksResults} from "../../../libs/services/taskService";
import {TaskResult} from "@/types/taskResult";
import {TaskMeta} from "@/types/taskMeta";
import {getAllExperiments} from "../../../libs/services/experimentMetaService";

const groupHeaders = [
    "group name",
    "group score",
    "group confidence"
]
const numberOfGroupsInOption = 3
export default async function AdminPage() {
    const [allTasksMeta, allTasksResults, allExperimentsMeta] = await Promise.all([
        getAllTasksMeta(),
        getAllTasksResults(),
        getAllExperiments()
    ])
    return (
        <main className="bg-white overflow-scroll">
            <table className="table-fixed text-black border-separate border border-slate-500">
                <thead>
                    <tr className="table-row">
                        <th className="border border-slate-500">task id</th>
                        <th className="border border-slate-500">task duration</th>
                        <th className="border border-slate-500">variant name</th>
                        <th className="border border-slate-500">experiment id</th>

                        {/* left */}
                        <th className="border border-slate-500">L option color</th>
                        <th className="border border-slate-500">L option name</th>
                        <th className="border border-slate-500">L preview name</th>
                        {/*left option groups*/}
                        {
                            Array(numberOfGroupsInOption).fill('').map((_, index) => {
                                return (
                                    <>
                                        {groupHeaders.map((header) => {
                                            return (
                                                <th className="border border-slate-500" key={index + header}>
                                                    {`L${index} ${header}`}
                                                </th>
                                            )
                                        })}
                                    </>
                                )
                            })
                        }

                        {/*right */}
                        <th className="border border-slate-500">R option color</th>
                        <th className="border border-slate-500">R option name</th>
                        <th className="border border-slate-500">R preview name</th>

                        {/*right option groups*/}
                        {
                            Array(numberOfGroupsInOption).fill('').map((_, index) => {
                                return (
                                    <>
                                        {groupHeaders.map((header) => {
                                            return (
                                                <th className="border border-slate-500" key={index + header}>
                                                    {`R${index} ${header}`}
                                                </th>
                                            )
                                        })}
                                    </>
                                )
                            })
                        }

                        {/*chosen option */}
                        <th className="border border-slate-500">chosen option</th>
                        <th className="border border-slate-500">chosen option confidence</th>
                    </tr>
                    {
                        allTasksResults.map((taskResult, index) => {
                            const taskMeta = allTasksMeta[index]
                            const experimentId = allExperimentsMeta.find(experiment => {
                                const taskIds = experiment.tasksIds.map(task => task.toString())
                                return taskIds.includes(taskMeta._id?.toString() ?? "")
                            })?._id?.toString() ?? ""
                            return (
                                <Row
                                    key={index}
                                    taskMeta={taskMeta}
                                    taskResult={taskResult}
                                    experimentId={experimentId}
                                />
                            )
                        })
                    }
                </thead>
            </table>
        </main>
    )
}

function Row({taskMeta, taskResult, experimentId}: {
    taskMeta: TaskMeta,
    taskResult: TaskResult,
    experimentId: string
}) {
    const taskId = taskMeta._id?.toString() || ""
    const taskDuration = taskResult.duration
    const variantName = taskMeta.variantName
    const leftOptionColor = taskMeta.leftOption.optionColor
    const leftOptionName = taskMeta.leftOption.optionName
    const leftPreviewName = taskMeta.preview.leftSnapshotsName
    const rightOptionColor = taskMeta.rightOption.optionColor
    const rightOptionName = taskMeta.rightOption.optionName
    const rightPreviewName = taskMeta.preview.rightSnapshotsName
    const chosenOption = taskResult.optionSelection.selectedSide
    const chosenOptionConfidence = taskResult.optionSelection.confidence
    const leftOptionGroups = taskMeta.leftOption.groupsNames
    const leftOptionGroupsScores = taskResult.leftScores
    const rightOptionGroups = taskMeta.rightOption.groupsNames
    const rightOptionGroupsScores = taskResult.rightScores
    return (
        <tr>
            <td className="border border-slate-500">{taskId}</td>
            <td className="border border-slate-500">{taskDuration}</td>
            <td className="border border-slate-500">{variantName}</td>
            <td className="border border-slate-500">{experimentId}</td>

            {/* left */}
            <td className="border border-slate-500">{leftOptionColor}</td>
            <td className="border border-slate-500">{leftOptionName}</td>
            <td className="border border-slate-500">{leftPreviewName}</td>
            {/*left option groups*/}
            {
                leftOptionGroups.map((groupName, index) => {
                    return (
                        <>
                            {/*group name*/}
                            <td className="border border-slate-500">{groupName}</td>
                            {/*group score value*/}
                            <td className="border border-slate-500">{leftOptionGroupsScores?.at(index)?.value ?? ''}</td>
                            {/*group score confidence*/}
                            <td className="border border-slate-500">{leftOptionGroupsScores?.at(index)?.confidence ?? ''}</td>
                        </>
                    )
                })
            }

            {/*right */}
            <td className="border border-slate-500">{rightOptionColor}</td>
            <td className="border border-slate-500">{rightOptionName}</td>
            <td className="border border-slate-500">{rightPreviewName}</td>

            {/*right option groups*/}
            {
                rightOptionGroups.map((groupName, index) => {
                    return (
                        <>
                            {/*group name*/}
                            <td className="border border-slate-500">{groupName}</td>
                            {/*group score value*/}
                            <td className="border border-slate-500">{rightOptionGroupsScores?.at(index)?.value ?? ''}</td>
                            {/*group score confidence*/}
                            <td className="border border-slate-500">{rightOptionGroupsScores?.at(index)?.confidence ?? ''}</td>
                        </>
                    )
                })
            }

            {/*chosen option */}
            <td className="border border-slate-500">{chosenOption}</td>
            <td className="border border-slate-500">{chosenOptionConfidence}</td>
        </tr>
    )


}

export const revalidate = 60