import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {prisma} from "@client";
import {redirect} from "next/navigation";

export default async function Task(request: NextRequest) {
    const experimentSessionId = cookies().get("experimentSessionId")?.value!
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
        return redirect(request.nextUrl.origin)
    }
    const activeChild = experimentApp.children.find(child => child.appName === 'task')!.activeChild ?? '0'
    return redirect(`/experiment/task/${activeChild}`)
}