import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@client";

export async function GET(request: NextRequest) {
    const experimentSessionId = request.cookies.get("experimentSessionId")?.value!
    if (!experimentSessionId) {
        return NextResponse.redirect(request.nextUrl.origin)
    }
    let experimentApp;
    try {
        experimentApp = await prisma.app.upsert({
            where : {
                appName_experimentSessionId: {
                    experimentSessionId,
                    appName: 'experiment'
                }
            },
            create: {
                appName: 'experiment',
                experimentSessionId,
            },
            update: {}
        })

    } catch (e) {
        console.log(e)
        return
    }
    if (!experimentApp) {
        return NextResponse.redirect(request.nextUrl.origin)
    }
    const activeChild = experimentApp!.activeChild
    if (!activeChild) {
        return NextResponse.redirect(`${request.nextUrl.href}/welcome`)
    }
    return NextResponse.redirect(`${request.nextUrl.href}/${activeChild}`)
}