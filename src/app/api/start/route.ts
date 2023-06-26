import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    const prolificId = request.nextUrl.searchParams.get("external_id")
    if (!prolificId) {
        throw new Error("No prolific id")
    }
    cookies().set("prolificId", prolificId)
    return NextResponse.redirect(`${request.nextUrl.origin}`)
}