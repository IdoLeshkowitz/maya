import {prisma} from "@client";
import {findFirstTask} from "@services/task";
import {cookies} from "next/headers";

const getCurrentTask = async (prolificId: string, taskIndex: string) => {
    try {
        return await findFirstTask({
            belongsToSession : {
                prolificId
            },
            orderInExperiment: parseInt(taskIndex)
        })
    } catch (e) {
        console.log(e)
    }
}

interface LeftPreviewParams {
    step: string
    taskIndex: string
}

export default async function LeftPreviewPage({params}: { params: LeftPreviewParams }) {
    const prolificId = cookies().get("prolificId")?.value!
    const currentTask = await getCurrentTask(prolificId, params.taskIndex)
    prisma.task.update({
        where: {
            id: currentTask!.id
        },
        data : {
            currentApp : "instructions",
            currentStep: parseInt(params.step)
        }
    }).catch((e) => {
        console.log(e)
    })
    return <div></div>
}