import prisma from "../../../prisma/client";
import {ExperimentStep} from "@prisma/client";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import PersonalDetails from "@/app/personalDetails/personalDetails";
interface PersonalDetailsPageProps {
    params: {
        id: string
    }
}

async function updateExperimentStep(prolificId: string) {
    try {
        await prisma.experimentSession.update({
            where: {
                prolificId: prolificId
            }, data: {
                step: ExperimentStep.PERSONAL_DETAILS
            }
        })
    } catch (e) {
        console.log(e)
    }
}

export default async function PersonalDetailsPage(props: PersonalDetailsPageProps) {
    const prolificId = cookies().get("prolificId")?.value;
    if (!prolificId) {
        return redirect("/")
    }
    await updateExperimentStep(prolificId)
    return <PersonalDetails/>

}