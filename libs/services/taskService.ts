import {TaskMeta} from "@/types/taskMeta";
import client from "../client";
import {Variant} from "@/types/variant";
import {shuffle} from "../utils/shuffle";
import {splitArray} from "../utils/splitArray";
import {TaskResult} from "@/types/taskResult";

export async function insertManyTasks(tasks: TaskMeta[]) {
    try {
        await client.connect()
        return await client.db("test").collection("tasks").insertMany(tasks)
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    } finally {
        await client.close()
    }
}

export function generateTasksFromVariants(variants: Variant[]): TaskMeta[] {
    const output: TaskMeta[] = []
    for (const variant of variants) {
        //shuffle options names
        const shuffledOptionsNames = shuffle(variant.optionsNames)
        //shuffle options colors
        const shuffledOptionsColors = shuffle(variant.optionsColors)
        //shuffle groups names
        const shuffledGroupsNames = shuffle(variant.groupsNames.map(group => shuffle(group)))
        //shuffle previews
        const shuffledPreviews = shuffle(variant.previews)

        //create tasks
        for (let i = 0; i < variant.numberOfTasks; i++) {
            const [leftGroupsNames, rightGroupsNames] = splitArray(shuffledGroupsNames[i])
            const [leftOptionName, rightOptionsName] = shuffledOptionsNames[i]
            const [leftOptionColor, rightOptionsColor] = shuffledOptionsColors[i]
            const taskMeta: TaskMeta = {
                variantName: variant.variantName,
                leftOption : {
                    optionName : leftOptionName,
                    optionColor: leftOptionColor,
                    groupsNames: leftGroupsNames
                },
                rightOption: {
                    optionName : rightOptionsName,
                    optionColor: rightOptionsColor,
                    groupsNames: rightGroupsNames
                },
                preview    : shuffledPreviews[i]
            }
            output.push(taskMeta)
        }
    }
    return output
}

export async function getAllTasksResults(): Promise<TaskResult[]> {
    try {
        await client.connect()
        return await client.db("test").collection("taskResults").find().toArray() as TaskResult[]
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}

export async function getAllTasksMeta(): Promise<TaskMeta[]> {
    try {
        await client.connect()
        return await client.db("test").collection("tasks").find().toArray() as TaskMeta[]
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}