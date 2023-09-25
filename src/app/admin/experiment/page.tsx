import {CsvLink} from "@components/CsvLink";
import prisma from "../../../../prisma/client";

async function getAllSessions() {
    return prisma.experimentSession.findMany()
}

export default async function AdminExperimentPage() {
    const sessions = await getAllSessions()
    console.log(sessions)
    const date = new Date().toLocaleDateString()
    return (
        <div className="min-h-screen bg-white min-w-max pt-5">
            <div className="mb-5">
                <CsvLink fileName={`experiment-sessions-${date}`} data={sessions}>Download Csv</CsvLink>
            </div>
        </div>
    )
}
export const revalidate = 60;