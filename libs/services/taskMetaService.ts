import {TaskMeta} from "@/types/taskMeta";
import client from "../client";
import 'server-only'

export async function insertManyTaskMeta(tasks: TaskMeta[]) {
    try {
        await client.connect()
        return await client.db(process.env.DB_NAME).collection("taskMeta").insertMany(tasks)
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    } finally {
        await client.close()
    }
}

export async function getAllTasksMeta(): Promise<TaskMeta[]> {
    try {
        await client.connect()
        return await client.db(process.env.DB_NAME).collection("taskMeta").find().toArray() as TaskMeta[]
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}