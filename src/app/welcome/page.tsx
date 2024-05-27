import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Prisma} from ".prisma/client";
import prisma from "../../../prisma/client";
import {ExperimentStep} from "@prisma/client";
import Welcome from "@components/experimentSteps/welcome";
export default async function WelcomePage() {
    const prolificId = cookies().get("prolificId")?.value;
    if (!prolificId) {
        return redirect("404")
    }
    try {
        await prisma.experimentSession.update({
            where: {
                prolificId: prolificId
            },
            data: {
                step : ExperimentStep.WELCOME
            }
        })
    }catch (e) {
        console.log(e)
    }
    return (<Welcome/>);
}