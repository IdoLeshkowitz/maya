import {NextResponse} from "next/server";
import {prisma} from "@client";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default async function Page() {
    const experimentSessionId = cookies().get("experimentSessionId")?.value
    if (!experimentSessionId) {
        return NextResponse.redirect("/")
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
        console.error(e)
        return redirect('/')
    }
    const instructionsApp = experimentApp.children.find(child => child.appName === 'instructions')
    const currentStep = instructionsApp!.currentStep
    if (currentStep === -1) {
        return redirect('/experiment/instructions/0')
    }
    return redirect(`/experiment/instructions/${currentStep}`)
}