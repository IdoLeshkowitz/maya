import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {SessionReturnType} from "@/app/api/session/[prolificId]/route";
import prisma from "../../../../../prisma/client";

async function getSession(prolificId: string) {
    return prisma.experimentSession.findFirst({
        where: {
            prolificId
        },
        include: {
            tasks: {
                orderBy: {orderInExperiment: "asc"}
            }
        },
    })
}

async function setTaskEndTime(prolificId: string, taskId: string) {
    return prisma.experimentSession.update({
        where: {
            prolificId
        },
        data: {
            activeTaskId: null,
            tasks: {
                update: {
                    where: {
                        id: taskId
                    },
                    data: {
                        endTime: new Date()
                    }
                }
            }
        }
    })
}


export async function GET(request: NextRequest) {
    const prolificId = cookies().get("prolificId")?.value
    if (!prolificId) {
        console.error(`no prolificId cookie found in request ${request}`)
        return NextResponse.redirect(request.nextUrl.origin)
    }
    const session: SessionReturnType = await getSession(prolificId)
    if (!session) {
        console.error(`no session found for prolificId ${prolificId}`)
        return NextResponse.redirect(request.nextUrl.origin)
    }
    const {tasks, activeTaskId} = session
    if (activeTaskId) {
        await setTaskEndTime(prolificId, activeTaskId)
    }
    const taskIndex = tasks.findIndex(task => task.id === activeTaskId)
    const nextTask = tasks[taskIndex + 1]
    if (!nextTask) {
        return NextResponse.redirect(`${request.nextUrl.origin}/personalDetails`)
    }
    return NextResponse.redirect(`${request.nextUrl.origin}/task/${nextTask.id}`)
}