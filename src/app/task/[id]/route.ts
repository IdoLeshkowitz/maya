import {NextRequest, NextResponse} from "next/server";
import {ExperimentStep, Prisma, TaskStep} from "@prisma/client";
import prisma from "../../../../prisma/client";
import {cookies} from "next/headers";
import {set} from "zod";

async function updateSession(prolificId: string,taskId:string) {
    const session = await prisma.experimentSession.update({
        where: {prolificId: prolificId},
        data: {
            activeTaskId:taskId,
        },
        include: {tasks: true}
    })
    return session
}

type SessionWithTasks = Prisma.PromiseReturnType<typeof updateSession>
export async function GET(request: NextRequest,context : {params : {id : string}}) {
    const {params : {id : taskId}} = context
    const prolificId = cookies().get("prolificId")?.value
    if (!prolificId) {
        return NextResponse.redirect(request.nextUrl.origin)
    }
    let updatedSession: SessionWithTasks;
    try {
        updatedSession = await updateSession(prolificId,taskId)
    }catch (e) {
        console.log("error updating session", e)
        return NextResponse.redirect(request.nextUrl.origin)
    }
    const {tasks} = updatedSession
    const step = tasks.find(task => task.id === taskId)?.step
    if (!step) {
        return NextResponse.redirect(`${request.nextUrl.origin}/task/${taskId}/start`)
    }else if (step === TaskStep.START){
        return NextResponse.redirect(`${request.nextUrl.origin}/task/${taskId}/start`)
    }else if (step === TaskStep.INSTRUCTIONS){
        return NextResponse.redirect(`${request.nextUrl.origin}/task/${taskId}/instructions`)
    }else if (step === TaskStep.PERFORMANCE){
        return NextResponse.redirect(`${request.nextUrl.origin}/task/${taskId}/performance`)
    }else if (step === TaskStep.OPTION_SELECTION){
        return NextResponse.redirect(`${request.nextUrl.origin}/task/${taskId}/optionSelection`)
    }else if (step === TaskStep.GRORP_SCORING) {
        return NextResponse.redirect(`${request.nextUrl.origin}/task/${taskId}/groupScoring`)
    }
    throw new Error(`step not found in session :${JSON.stringify(updatedSession)}`)
}