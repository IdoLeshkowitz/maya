import {NextResponse} from "next/server";
import {Request} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import {TaskResult} from "@/types/taskResult";
import client from "@client";

export async function POST(request: Request) {
    const taskResultsToInsert: TaskResult[] = await request.json()
    try {
        await client.connect()
        const insertedTaskResults = await client.db("test").collection("taskResults").insertMany(taskResultsToInsert)
        return NextResponse.json(insertedTaskResults)
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    } finally {
        await client.close()
    }
}
