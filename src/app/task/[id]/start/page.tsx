import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {SessionReturnType} from "@/app/api/session/[prolificId]/route";
import Start from "@/app/task/[id]/start/start";

interface TaskStartProps {
    params: {
        id: string
    }
}

async function getSession(prolificId: string): Promise<SessionReturnType> {
    let session: SessionReturnType
    try {
        const res = await fetch(`${process.env["BASE_URL"]}/api/session/${prolificId}`)
        const data = await res.json()
        session = data
        return session
    } catch (e) {
        console.error(e)
        throw new Error(`Failed to get session for prolificId ${prolificId}\n${e}`)
    }
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