"use server"
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export async function validateUserNameAndPassword({username, password}: {username: string, password: string}) {
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        if (process.env.ADMIN_COOKIE === undefined) {
            throw new Error("ADMIN_COOKIE is not set")
        }
        cookies().set("admin", process.env.ADMIN_COOKIE)
        return redirect("/admin")
    }
    return Promise.reject("Invalid username or password")
}