import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {findUniqueExperimentSession} from "@services/experimentSession";
import {prisma} from "@client";

export async function GET(request: NextRequest) {
    const experimentSessionId = request.cookies.get("experimentSessionId")?.value!
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
                                appName: 'task'
                            }
                        },
                        create: {
                            appName            : 'task',
                            experimentSessionId: experimentSessionId
                        }
                    }
                },
                activeChild: 'task'
            },
            include: {
                children: true
            }
        })
    } catch (e) {
        console.log(e)
        return NextResponse.redirect(request.nextUrl.origin)
    }
    const tasksApp = experimentApp.children.find(child => child.appName === 'task')
    const currentStep = tasksApp!.currentStep
    if (currentStep === -1) {
        return NextResponse.redirect(`${request.nextUrl.href}/0`)
    }
    return NextResponse.redirect(`${request.nextUrl.href}/${currentStep}`)
}