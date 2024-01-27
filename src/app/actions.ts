'use server'
import {cookies} from "next/headers";
import prisma from "../../prisma/client";

export async function patchPersonalDetailsAnswers(answers: Record<string, string>) {
    const prolificId = cookies().get("prolificId")?.value;
    if (!prolificId) {
        return JSON.stringify({error: "No Prolific ID found"})
    }
    try {
        const userDetails = await prisma.userDetails.findFirst({
            where: {
                ProlificId: prolificId
            }
        })
        let currentAnswers = {}
        try {
            currentAnswers = JSON.parse(userDetails?.answers as string)
        } catch (e) {
            console.error(e)
        }
        const newAnswers = {...currentAnswers, ...answers}
        await prisma.userDetails.upsert({
            create: {
                ProlificId: prolificId,
                answers: JSON.stringify(newAnswers),
            },
            update: {
                answers: JSON.stringify(newAnswers),
            },
            where: {
                ProlificId: prolificId
            }
        })
        return JSON.stringify({success: true})
    } catch (e) {
        console.error(e)
        return JSON.stringify({error: e})
    }
}