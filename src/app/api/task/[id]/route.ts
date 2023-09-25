import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../prisma/client";
import {Prisma} from "@prisma/client";
import TaskUpdateInput = Prisma.TaskUpdateInput;

async function getTask(taskId: string) {
    return prisma.task.findUnique({
        where: {
            id: taskId
        }
    })
}

export type TaskReturnType = Prisma.PromiseReturnType<typeof getTask>

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    const params = context.params
    let task: TaskReturnType;
    try {
        task = await getTask(params.id)
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
    return NextResponse.json(task)
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    const params = context.params
    const taskToUpdate: TaskUpdateInput = await request.json()
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: params.id
            },
            data: taskToUpdate
        })
        return NextResponse.json({updatedTask})
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
}