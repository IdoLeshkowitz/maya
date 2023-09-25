import {NextRequest, NextResponse} from "next/server";
import prisma from "../../../../../prisma/client";
import {Prisma} from "@prisma/client";

async function getSession(prolificId: string) {
    return prisma.experimentSession.findUnique({
        where: {
            prolificId: prolificId
        },
        include: {
            tasks: true
        }
    })
}

export type SessionReturnType = Prisma.PromiseReturnType<typeof getSession>

export async function GET(request: NextRequest, context: { params: { prolificId: string } }) {
    let session: SessionReturnType;
    try {
        session = await getSession(context.params.prolificId)
    } catch (e) {
        console.error(`Error getting session for prolificId ${e}`)
        return NextResponse.json({error: e}, {status: 500})
    }
    if (!session) {
        return NextResponse.json({error: `No session found for prolificId ${context.params.prolificId}`}, {status: 404})
    }
    return NextResponse.json(session)
}