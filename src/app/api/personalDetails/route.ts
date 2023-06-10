import client from "@client";
import {PersonalDetails} from "@/types/personalDetails";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    const personalDetailsToInsert: PersonalDetails = await request.json()
    try {
        await client.connect()
        const insertedPersonalDetails = await client.db(process.env.DB_NAME).collection("personalDetails").insertOne(personalDetailsToInsert)
        return NextResponse.json(insertedPersonalDetails)
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    } finally {
        await client.close()
    }
}