import {prisma} from "@client";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

interface TaskStepParams {
    taskIndex: string
}

export default async function TaskStep({params}: { params: TaskStepParams }) {
    const taskIndex = parseInt(params.taskIndex)
    const experimentSessionId = cookies().get("experimentSessionId")?.value!
    let taskApp;
    try {
        taskApp = await prisma.app.update({
            where  : {
                appName_experimentSessionId: {
                    appName: 'task',
                    experimentSessionId
                }
            },
            data   : {
                children   : {
                    upsert: {
                        where : {
                            appName_experimentSessionId: {
                                appName: taskIndex.toString(),
                                experimentSessionId
                            }
                        },
                        create: {
                            appName: taskIndex.toString(),
                            experimentSessionId
                        },
                        update: {}
                    }
                },
                activeChild: taskIndex.toString()
            },
            include: {
                children: true
            }
        })
    } catch (e) {
        console.error(e)
        return redirect('/')
    }
    const currentSubTask = taskApp.children.find(child => child.appName === taskIndex.toString())
    const subTaskActiveChild = currentSubTask!.activeChild
    if (!subTaskActiveChild) {
        return redirect(`/experiment/task/${taskIndex}/start`)
    }
    return redirect(`/experiment/task/${taskIndex}/${subTaskActiveChild}`)
}

