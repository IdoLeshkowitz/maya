import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
    const sysma = cookies().get("sysma")?.value
    if (sysma !== "1825") {
        return redirect("/")
    }
    return (
        <div className="bg-white text-slate-700 min-h-screen flex justify-evenly items-center">
            <Link href="/admin/experiment" className="rounded-md border border-slate-500 px-10 py-3">experiment
                table</Link>
            <Link href="/admin/personalDetails" className="rounded-md border border-slate-500 px-10 py-3">personal
                details table</Link>
            <Link href="/admin/task" className="rounded-md border border-slate-500 px-10 py-3">tasks table</Link>
        </div>
    )
}