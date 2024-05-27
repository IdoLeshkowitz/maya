import {ExperimentStep} from "@prisma/client";
import prisma from "../../../prisma/client";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Instrucrions from "@/app/instructions/Instructions";
async function updateExperimentStep(prolificId: string) {
    try {
        await prisma.experimentSession.update({
            where: {
                prolificId: prolificId
            }, data: {
                step: ExperimentStep.INSTRUCTIONS
            }
        })
    } catch (e) {
        console.log(e)
    }
}
export default async function ExperimentInstructions() {
    const prolificId = cookies().get("prolificId")?.value;
    if (!prolificId) {
        return redirect("/")
    }
    await updateExperimentStep(prolificId)
    return<Instrucrions/>
}