import prisma from "../../../../../prisma/client";
import {CsvLink} from "@components/CsvLink";

async function getAllTasks() {
    return prisma.task.findMany()
}

const headers = [
    {label: "sessionId", key: "SessionId"},
    {label: "step", key: "step"},
    {label: "overall_preview_name", key: "overallPreviewName"},
    {label: "selected_side", key: "optionSelection.selectedSide"},
    {label: "confidence", key: "optionSelection.confidence"},
    {label: "left_option_name", key: "leftOption.name"},
    {label: "left_option_color", key: "leftOption.color"},
    {label: "left_option_groupsNames", key: "leftOption.groupsNames"},
    {label: "right_option_performance_group_name", key: "rightOption.performance.groupName"},
    {label: "right_option_performance_simple_name", key: "rightOption.performance.simpleName"},
    {label: "right_option_name", key: "rightOption.name"},
    {label: "right_option_color", key: "rightOption.color"},
    {label: "right_option_groupsNames", key: "rightOption.groupsNames"},
    {label: "right_option_performance_group_names", key: "rightOption.performance.groupName"},
    {label: "right_option_performance_simple_names", key: "rightOption.performance.simpleName"},
]

export default async function AdminTaskPage(props: { params: { experimentName: string } }) {
    const tasks = await getAllTasks()
    const parsedTasks = tasks.map((task: any) => {
        return {
            ...task,
            optionSelection: JSON.parse(task.optionSelection),
            leftOption: {
                ...task.leftOption,
                performance: JSON.parse(task.leftOption.performance),
            },
            rightOption: {
                ...task.rightOption,
                performance: JSON.parse(task.rightOption.performance)
            }
        }
    })
    return (
        <div className="min-h-screen bg-white min-w-max pt-5">
            <div className="mb-5">
                <CsvLink
                    fileName="tasks.csv"
                    headers={headers}
                    data={parsedTasks}
                >
                    Download CSV
                </CsvLink>
            </div>
        </div>
    )
}
export const revalidate = 180;