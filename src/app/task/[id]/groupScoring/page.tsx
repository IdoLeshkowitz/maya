import prisma from "../../../../../prisma/client";
import {TaskStep} from "@prisma/client";
import GroupScoring from "@/app/task/[id]/groupScoring/groupScoring";

interface GroupScoringProps {
    params: {
        id: string
    }
}

async function updateTaskStep(taskId: string) {
    const task = await prisma.task.update({
        where: {
            id: taskId
        }, data: {
            step: TaskStep.GRORP_SCORING
        }
    })
    return task
}

export default async function GroupScoringPage(props: GroupScoringProps) {
    await updateTaskStep(props.params.id)
    return <GroupScoring/>
}