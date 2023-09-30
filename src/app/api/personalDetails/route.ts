import prisma from "../../../../prisma/client";
import {Prisma} from ".prisma/client";
import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

async function createPersonalDetails(prolificId: string, input: Prisma.UserDetailsCreateWithoutSessionInput) {
    return prisma.userDetails.upsert({
        create: {
            ...input,
            Session: {
                connect: {
                    prolificId
                }
            }
        },
        update: {
            ...input,
            Session: {
                connect: {
                    prolificId
                }
            }
        },
        where: {
            SessionId: prolificId
        }
    })
}

export async function POST(request: NextRequest) {
    const prolificId = cookies().get("prolificId")?.value
    if (!prolificId) {
        console.error(`no prolificId cookie found in request ${request}`)
        return NextResponse.redirect(request.nextUrl.origin)
    }
    const personalDetails = await request.json()
    try {
        await createPersonalDetails(prolificId, personalDetails)
        return NextResponse.json(personalDetails)
    } catch (e) {
        console.error(e)
        return NextResponse.error()
    }
}