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
    const prolificIdByExperimentVersion = experimentVersions.reduce((acc, version) => {
        acc[version] = sessions.filter(session => session.experimentVersion === version).map(session => session.prolificId)
        return acc
    }, {} as Record<string, string[]>)
    const userDetailsByVersion = experimentVersions.reduce((acc, version) => {
        acc[version] = userDetails.filter(userDetail => prolificIdByExperimentVersion[version].includes(userDetail.ProlificId)).map(userDetail => {
            const parsedAnswers = JSON.parse(userDetail.answers ?? {} as any)
            return {
                ...userDetail,
                ...parsedAnswers
            }
        })
        return acc
    }, {} as Record<string, any[]>)
    return (
        <div className="min-h-screen bg-white min-w-max pt-5">
            <div className="mb-5">
                {
                    experimentVersions.map((version, index) => {
                        return (
                            <CsvLink key={index} data={JSON.stringify(userDetailsByVersion[version])} fileName={`sessions-${version}.csv`}>
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