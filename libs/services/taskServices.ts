import {Task} from "@/types/task";
import client from "@client";

export async function insertManyTasks(tasks: Task[]) {
    try {
        await client.connect()
        return await client.db("dev").collection("task").insertMany(tasks)
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    } finally {
        await client.close()
    }
}

export async function updateTask(task: Task) {
    try {
        await client.connect()
        return await client.db("dev").collection("task").updateOne({_id: task._id}, {$set: {...task}})
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    } finally {
        await client.close()
    }
}

export async function getAllTasks(): Promise<Task[]> {
    try {
        await client.connect()
        return await client.db("dev").collection("task").find().toArray() as Task[]
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}