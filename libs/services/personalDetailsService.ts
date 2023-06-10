import {PersonalDetails} from "@/types/personalDetails";
import client from "@client";

export async function getAllPersonalDetails() {
    try {
        await client.connect()
        return await client.db(process.env.DB_NAME).collection("personalDetails").find({}).toArray() as PersonalDetails[]
    }catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}