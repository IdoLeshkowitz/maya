'use client'
import {FC, useState} from "react";
import {Task} from "@/types/task";

interface TaskProps {
    task: Task
}

enum TaskState {
    PREVIEW,
    IN_PROGRESS,
    COMPLETE
}

const TaskComp: FC<TaskProps> = ({task}) => {
    const [taskState, setTaskState] = useState(TaskState.PREVIEW)
    return (
        {

        }
    )
}


export default TaskComp

