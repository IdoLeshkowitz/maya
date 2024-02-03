import {CsvLink} from "@components/CsvLink";
import prisma from "../../../../prisma/client";

async function getAllSessions() {
    return prisma.experimentSession.findMany()
}

const headers = [
    {label: "prolificId", key: "prolificId"},
    {label: "startTime", key: "createdAt"},
    {label: "endTime", key: "endTime"},
    {label: "variantName", key: "variantName"},
    {label: "experimentName", key: "experimentName"},
    {label: "experimentVersion", key: "experimentVersion"},
]

export default async function AdminExperimentPage() {
    const sessions = await getAllSessions()
    const date = new Date().toLocaleDateString()
    return (
        <div className="min-h-screen bg-white min-w-max pt-5">
            <div className="mb-5">
                <CsvLink fileName={`experiment-sessions-${date}`} headers={headers} data={JSON.stringify(sessions)}>Download Csv</CsvLink>
            </div>
        </div>
    )
}
export const revalidate = 0