import {insertManyTasks, updateTask} from "@services/taskServices";
import {NextResponse} from "next/server";
import {ObjectId} from "mongodb";

export async function POST(request: Request) {
    const tasksToInsert = await request.json()
    try {
        return await insertManyTasks(tasksToInsert)
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
}

export async function PUT(request: Request) {
    const taskToUpdate = await request.json()
    try {
        const res = await updateTask({
            _id         : new ObjectId(taskToUpdate._id),
            taskMetaId  : new ObjectId(taskToUpdate.taskMetaId),
            taskResultId: new ObjectId(taskToUpdate.taskResultId),
        })
        return NextResponse.json(res)
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
}