import {NextRequest, NextResponse, userAgent} from "next/server";
import {redirect} from "next/navigation";

export function middleware(request: NextRequest, context: any) {
    /* check if the user is browsing from mobile */
    const {device} = userAgent(request)
    if (device.type === "mobile") {
        const urlToGo = `${request.nextUrl.origin}/mobileBlock`
        return NextResponse.redirect(urlToGo)
    }
    if (request.nextUrl.pathname.includes("/admin")) {
        if (request.nextUrl.pathname.includes("/admin/signin") || request.nextUrl.pathname.includes("loading")) {
            return NextResponse.next()
        }
        const adminCookie = request.cookies.get("admin")?.value === process.env.ADMIN_COOKIE
        if (!adminCookie) {
            return NextResponse.redirect(request.nextUrl.origin + "/admin/signin")
        }
    }
    return NextResponse.next()
}

