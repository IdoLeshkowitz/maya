import {TaskStep} from "@prisma/client";
import prisma from "../../../../../prisma/client";
import Performance from "./performance";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

interface PerformancePageProps {
    params: {
        id: string
    }
}

async function updateTaskStep(taskId: string) {
    const task = await prisma.task.update({
        where: {
            id: taskId
        }, data: {
            step: TaskStep.PERFORMANCE
        }
    })
    return task
}

export default async function PerformancePage(props: PerformancePageProps) {
    const prolificId = cookies().get("prolificId")?.value;
    if (!prolificId) {
        return redirect("/")
    }
    await updateTaskStep(props.params.id)
    return <Performance taskId={props.params.id}/>
}