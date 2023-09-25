import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../prisma/client";
import {cookies} from "next/headers";
import {ExperimentStep, Prisma} from "@prisma/client";
import {redirect} from "next/navigation";

async function updateSession(prolificId: string) {
    const session = await prisma.experimentSession.update({
        where: {prolificId: prolificId}, data: {step: ExperimentStep.TASKS}, include: {tasks: true}
    })
    return session
}

type SessionWithTasks = Prisma.PromiseReturnType<typeof updateSession>

export async function GET(request: NextRequest) {
    const prolificId = cookies().get("prolificId")?.value
    if (!prolificId) {
        return NextResponse.redirect("/")
    }
    let session: SessionWithTasks;
    try {
        session = await updateSession(prolificId)
    } catch (e) {
        console.log("error updating session", e)
        return NextResponse.redirect("/")
    }
    const {tasks, activeTaskId} = session
    if (activeTaskId) {
        return NextResponse.redirect(`${request.nextUrl.origin}/task/${activeTaskId}`)
    }
    return redirect(`${request.nextUrl.origin}/task/${tasks[0].id}`)
}