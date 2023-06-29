import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@client";

export async function GET(request: NextRequest) {
    const experimentSessionId = request.cookies.get("experimentSessionId")?.value
    if (!experimentSessionId) {
        return NextResponse.redirect(request.nextUrl.origin)
    }
    let experimentApp;
    try {
        experimentApp = await prisma.app.update({
            where  : {
                appName_experimentSessionId: {
                    experimentSessionId,
                    appName: 'experiment'
                }
            },
            data   : {
                children   : {
                    connectOrCreate: {
                        where : {
                            appName_experimentSessionId: {
                                experimentSessionId,
                                appName: 'instructions'
                            }
                        },
                        create: {
                            appName            : 'instructions',
                            experimentSessionId: experimentSessionId
                        }
                    }
                },
                activeChild: 'instructions'
            },
            include: {
                children: true
            }
        })
    } catch (e) {
        console.log(e)
        return NextResponse.redirect(`${request.nextUrl.origin}`)
    }
    const instructionsApp = experimentApp.children.find(child => child.appName === 'instructions')
    const currentStep = instructionsApp!.currentStep
    if (currentStep === -1) {
        return NextResponse.redirect(`${request.nextUrl.origin}/${request.nextUrl.pathname}/0`)
    }
    return NextResponse.redirect(`${request.nextUrl.origin}/${request.nextUrl.pathname}/${currentStep}`)
}