"use server"

import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export const GET = async (req : NextRequest) => {
     cookies().delete("admin")
    return NextResponse.redirect(req.nextUrl.origin + "/admin/signin")
}