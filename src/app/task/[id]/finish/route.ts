import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {SessionReturnType} from "@/app/api/session/[prolificId]/route";

async function getSession(prolificId: string) {
    const res = await fetch(`${process.env["NEXT_PUBLIC_BASE_URL"]}/api/session/${prolificId}`)
    return await res.json()
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
    const taskIndex = tasks.findIndex(task => task.id === activeTaskId)
    const nextTask = tasks[taskIndex + 1]
    if (!nextTask) {
        return NextResponse.redirect(`${request.nextUrl.origin}/personalDetails`)
    }
    return NextResponse.redirect(`${request.nextUrl.origin}/task/${nextTask.id}`)
}