import {TaskResult} from "@/types/taskResult";
import client from "../client";

export async function getAllTasksResults(): Promise<TaskResult[]> {
    try {
        await client.connect()
        return await client.db("test").collection("taskResults").find().toArray() as TaskResult[]
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}

