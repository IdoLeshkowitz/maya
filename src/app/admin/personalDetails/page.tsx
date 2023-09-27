import prisma from "../../../../prisma/client";
import {CsvLink} from "@components/CsvLink";

async function getAllUserDetails() {
    return prisma.userDetails.findMany()
}

export default async function PersonalDetailsPage() {
    const userDetails = await getAllUserDetails()
    console.log(userDetails)
    return (
        <div className="min-h-screen bg-white min-w-max pt-5">
            <div className="mb-5">
                <CsvLink data={userDetails || []} fileName="user-details.csv">
                    Download CSV
                </CsvLink>
            </div>
        </div>
    )
}

export const revalidate = 0;