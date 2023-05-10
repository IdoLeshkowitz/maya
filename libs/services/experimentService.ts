import {Variant} from "@/types/variant";
import {generateTasksFromVariants, insertManyTasks} from "./taskService";
import {ExperimentMeta} from "@/types/experimentMeta";
import client from "../client";
import {log} from "util";

export async function generateExperiment() {
    const variants: Variant[] = require("@assets/variants.json")
    //generate tasks
    const tasks = generateTasksFromVariants(variants)
    //insert tasks
    const insertedTasks = await insertManyTasks(tasks)
    console.log('insertedTasks', insertedTasks)
    const insertedTasksIds = Object.values(insertedTasks?.insertedIds ?? {})

    //insert experiment
    const experiment: ExperimentMeta = {
        tasksIds: Object.values(insertedTasksIds)
    }
    // await insertOneExperiment(experiment)
    return {data: {experiment, tasks}}
}

export async function insertOneExperiment(experiment: ExperimentMeta) {
    try {
        await client.connect()
        return await client.db("test").collection("experiments").insertOne(experiment)
    } catch (e) {
        console.error(e)
    } finally {
        await client.close()
    }
}



