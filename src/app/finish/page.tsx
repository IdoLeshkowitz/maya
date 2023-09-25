import prisma from "../../../prisma/client";
import {ExperimentStep} from "@prisma/client";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Finish from "@/app/finish/finish";

interface FinishPageProps {
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
                step: ExperimentStep.FINISH
            }
        })
    } catch (e) {
        console.log(e)
    }
}

export default async function PersonalDetailsPage(props: FinishPageProps) {
    const prolificId = cookies().get("prolificId")?.value;
    if (!prolificId) {
        return redirect("/")
    }
    await updateExperimentStep(prolificId)
    return <Finish/>

}