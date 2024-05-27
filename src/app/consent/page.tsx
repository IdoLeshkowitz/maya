import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {Prisma} from ".prisma/client";
import prisma from "../../../prisma/client";
import {ExperimentStep} from "@prisma/client";
import Consent from "@/app/consent/consent";

export default async function ConsentPage() {
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
                step : ExperimentStep.CONSENT
            }
        })
    }catch (e) {
        console.log(e)
    }
    return (<Consent/>);
}