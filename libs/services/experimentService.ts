import {Variant} from "@/types/variant";
import {generateTasksFromVariants} from "./taskService";
import {ExperimentMeta} from "@/types/experimentMeta";
import client from "../client";
import {cache} from "react";

export const generateExperiment = cache(async () => {
    const variants: Variant[] = require("@assets/variants.json")
    //generate tasks
    const tasks = generateTasksFromVariants(variants)
    try {
        await client.connect()
        const insertedTasks = await client.db("test").collection("tasks").insertMany(tasks)
        const insertedTasksIds = Object.values(insertedTasks?.insertedIds ?? {})
        //insert experiment
        const experiment: ExperimentMeta = {
            tasksIds: Object.values(insertedTasksIds)
        }
        await client.db("test").collection("experiments").insertOne(experiment)
        return {data: {experiment, tasks}}
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
})


export async function getAllExperiments(): Promise<ExperimentMeta[]> {
    try {
        await client.connect()
        const experiments = await client.db("test").collection("experiments").find({}).toArray() as ExperimentMeta[]
        return experiments
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}