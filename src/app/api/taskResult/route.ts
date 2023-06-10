import {NextResponse} from "next/server";
import {Request} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {TaskResult} from "@/types/taskResult";
import client from "@client";

export async function POST(request: Request) {
    const taskResultToInsert: TaskResult = await request.json()
    try {
        await client.connect()
        const insertedTaskResult = await client.db(process.env.DB_NAME).collection("taskResults").insertOne(taskResultToInsert)
        return NextResponse.json(insertedTaskResult)
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    } finally {
        await client.close()
    }
}

