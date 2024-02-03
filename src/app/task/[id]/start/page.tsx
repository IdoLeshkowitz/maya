import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Start from "@/app/task/[id]/start/start";
import prisma from "../../../../../prisma/client";

interface TaskStartProps {
    params: {
        id: string
    }
}

async function getSession(prolificId: string) {
    return prisma.experimentSession.findUnique({
        where: {
            prolificId: prolificId
        },
        include: {
            tasks: true
        }
    })
}

async function setTaskStartTime(id: string) {
    return prisma.task.update({
        where: {
            id: id
        },
        data: {
            startTime: new Date()
        }
    })
}

export default async function TaskStart(props: TaskStartProps) {
    const {id} = props.params
    const prolificId = cookies().get('prolificId')?.value
    if (!prolificId) {
        redirect("/")
    }
    const session = await getSession(prolificId)
    const taskOrder = session?.tasks.findIndex(task => task.id === id)
    try {
        await setTaskStartTime(id)
    } catch (e) {
        console.error(e)
    }
    return <Start isFirst={taskOrder === 0} taskId={id}/>
}