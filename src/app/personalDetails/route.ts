import prisma from "../../../prisma/client";
import {ExperimentStep, Prisma} from "@prisma/client";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

async function updateExperimentStep(prolificId: string) {
    return prisma.experimentSession.update({
        where: {
            prolificId: prolificId
        }, data: {
            step: ExperimentStep.PERSONAL_DETAILS
        },
    })
}

type SessionWithUserDetails = Prisma.PromiseReturnType<typeof updateExperimentStep>

export async function GET(request: NextRequest) {
    const prolificId = cookies().get("prolificId")?.value;
    if (!prolificId) {
        return NextResponse.redirect("/")
    }
    const {activePersonalDetailsPage}: SessionWithUserDetails = await updateExperimentStep(prolificId)
    if (activePersonalDetailsPage) {
        return NextResponse.redirect(`${request.nextUrl.origin}/personalDetails/${activePersonalDetailsPage}`)
    }
    return NextResponse.redirect(`${request.nextUrl.origin}/personalDetails/0`)
}