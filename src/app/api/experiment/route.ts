import {Experiment} from "@/types/experiment";
import {NextResponse} from "next/server";
import client from "@client";
import experimentConfig from "@public/experimentConfig.json"
import {ExperimentMeta} from "@/types/experimentMeta";
import {insertOneExperimentMeta} from "@services/experimentMetaService";
import {createTaskMetasFromConfig, shuffleConfig} from "@/utils/shuffleConfig";
import {insertManyTaskMeta} from "@services/taskMetaService";
import {insertOneExperiment} from "@services/experimentService";
import {Task} from "@/types/task";
import {insertManyTasks, updateTask} from "@services/taskServices";

export async function POST(request: Request) {
    const experimentToInsert: Experiment = await request.json()
    try {
        await client.connect()
        const insertedExperiment = await client.db(process.env.DB_NAME).collection("experiment").insertOne(experimentToInsert)
        return NextResponse.json(insertedExperiment)
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    } finally {
        await client.close()
    }
}

export async function PUT(request: Request) {
    const experimentToUpdate: Experiment = await request.json()
    try {
        await client.connect()
        const updatedExperiment = await client.db(process.env.DB_NAME).collection("experiment").updateOne({_id: experimentToUpdate._id}, {$set: experimentToUpdate})
        return NextResponse.json(updatedExperiment)
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    } finally {
        await client.close()
    }
}

export async function GET(request: Request) {
    /* shuffle config */
    const config = shuffleConfig(experimentConfig)
    /* create tasks meta */
    const tasksMeta = createTaskMetasFromConfig(config)
    try {
        const insertedResult = await insertManyTaskMeta(tasksMeta)
        Object.keys(insertedResult.insertedIds).forEach((key, index) => {
            tasksMeta[index]._id = insertedResult.insertedIds[index]
        })
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
    /* insert tasks */
    const tasks: Task[] = tasksMeta.map(taskMeta => ({
        taskMetaId: taskMeta._id!,
    }))
    try {
        const insertedResults = await insertManyTasks(tasks)
        Object.keys(insertedResults.insertedIds).forEach((key, index) => {
            tasks[index]._id = insertedResults.insertedIds[index]
        })
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
    const prolificId = request.headers.get("prolificid")!
    const experimentMeta: ExperimentMeta = {
        config,
        prolificId,
        tasksIds: tasks.map(task => task._id!),
    }
    try {
        const insertedResult = await insertOneExperimentMeta(experimentMeta)
        experimentMeta._id = insertedResult.insertedId
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
    const experiment: Experiment = {
        experimentMetaId: experimentMeta._id,
    }
    try {
        const insertedResult = await insertOneExperiment(experiment)
        experiment._id = insertedResult.insertedId
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
    /* update tasks with experiment id */
    const tasksToUpdate = tasks.map(task => ({
        ...task,
        belongsToExperimentId: experiment._id
    }))
    tasks.forEach((task, index) => {
        tasksToUpdate[index].belongsToExperimentId = experiment._id
    })
    try {
        const promises = tasksToUpdate.map(task => updateTask(task))
        await Promise.all(promises)

    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
    const data = {
        tasks,
        experimentMeta,
        tasksMeta,
        experiment
    }
    return NextResponse.json({data})
}