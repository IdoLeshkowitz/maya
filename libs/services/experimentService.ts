import client from "@client";
import {Experiment} from "@/types/experiment";
import {cache} from "react";

export async function insertOneExperiment(experiment: Experiment) {
    try {
        await client.connect()
        return await client.db(process.env.DB_NAME).collection("experiment").insertOne(experiment)
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    } finally {
        await client.close()
    }

}

export const  getAllExperiments = cache(async()=>{
    try {
        await client.connect()
        return await client.db(process.env.DB_NAME).collection("experiment").find({}).toArray() as Experiment[]
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    } finally {
        await client.close()
    }
})