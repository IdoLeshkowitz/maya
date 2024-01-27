import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {SessionReturnType} from "@/app/api/session/[prolificId]/route";
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


export default async function TaskStart(props: TaskStartProps) {
    const {id} = props.params
    const prolificId = cookies().get('prolificId')?.value
    if (!prolificId) {
        redirect("/")
    }
    const session = await getSession(prolificId)
    const taskOrder = session?.tasks.findIndex(task => task.id === id)
    return <Start isFirst={taskOrder === 0} taskId={id}/>
}