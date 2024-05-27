import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import prisma from "../../../../../prisma/client";
import TaskInstructions from "@components/taskSteps/taskInstructions";
import {Prisma, TaskStep} from "@prisma/client";
import OptionSelection from "@/app/task/[id]/optionSelection/optionSelection";

async function updateTaskStep(taskId: string) {
    const task = await prisma.task.update({
        where: {
            id: taskId
        }, data: {
            step: TaskStep.OPTION_SELECTION
        }
    })
    return task
}

type Task = Prisma.PromiseReturnType<typeof updateTaskStep>

interface TaskStartPageProps {
    params: {
        id: string
    }
}

export default async function OptionSelectionPage(props: TaskStartPageProps) {
    const prolificId = cookies().get("prolificId")?.value;
    if (!prolificId) {
        return redirect("/")
    }
    await updateTaskStep(props.params.id)
    return <OptionSelection />
}