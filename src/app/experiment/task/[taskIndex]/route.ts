import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@client";

export async function GET(request: NextRequest) {
    const taskIndex = request.nextUrl.href.split("/").pop()!
    let taskApp;
    try {
        taskApp = await prisma.app.update({
            where: {
                appName_experimentSessionId: {
                    experimentSessionId: request.cookies.get("experimentSessionId")?.value!,
                    appName            : 'task'
                }
            },
            data : {
                currentStep: parseInt(taskIndex)
            }
        })
    } catch (e) {
        console.log(e)
        return NextResponse.redirect(request.nextUrl.origin)
    }
    const activeChild = taskApp!.activeChild
    if (!activeChild) {
        return NextResponse.redirect(`${request.nextUrl.href}/start`)
    }
    return NextResponse.redirect(`${request.nextUrl.href}/${activeChild}`)
}