import prisma from "../../../../prisma/client";
import {CsvLink} from "@components/CsvLink";

async function getAllUserDetails() {
    return prisma.userDetails.findMany()
}

async function getAllSessions() {
    return prisma.experimentSession.findMany()
}

export default async function PersonalDetailsPage() {
    const userDetails = await getAllUserDetails() ?? []
    const sessions = await getAllSessions() ?? []
    const experimentVersions = Array.from(new Set(sessions.map(session => session.experimentVersion)))
    return (
        <div className="min-h-screen bg-white min-w-max pt-5">
            <div className="mb-5">
                {
                    experimentVersions.map((version, index) => {
                        return (
                            <CsvLink key={index} data={JSON.stringify(sessions.filter(session => session.experimentVersion === version))} fileName={`sessions-${version}.csv`}>
                                Download CSV for {version}
                            </CsvLink>
                        )
                    }
                    )
                }
            </div>
        </div>
    )
}

export const revalidate = 0;