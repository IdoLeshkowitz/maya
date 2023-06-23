import {ExperimentMeta} from "@/types/experimentMeta";
import client from "../client";
import 'server-only'
import {cache} from "react";

export const getAllExperimentMeta = cache(async () => {
    try {
        await client.connect()
        return await client.db(process.env.DB_NAME).collection("experimentMeta").find({}).toArray() as ExperimentMeta[]
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
})

export const insertOneExperimentMeta = async (experiment: ExperimentMeta)=> {
    try {
        await client.connect()
        return await client.db(process.env.DB_NAME).collection("experimentMeta").insertOne(experiment)
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    } finally {
        await client.close()
    }
}