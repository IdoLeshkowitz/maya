import {NextRequest, NextResponse, userAgent} from "next/server";

export function middleware(request: NextRequest,context:any) {
    /* check if the user is browsing from mobile */
    const {device} = userAgent(request)
    if (device.type === "mobile") {
        const urlToGo = `${request.nextUrl.origin}/mobileBlock`
        return NextResponse.redirect(urlToGo)
    }
}

