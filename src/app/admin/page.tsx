import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function AdminPage(){
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
        return redirect('api/auth/signin')
    }
    return (
        <div className="bg-white text-slate-700 min-h-screen flex justify-evenly items-center">
            <Link href="/admin/experiment" className="rounded-md border border-slate-500 px-10 py-3">experiment table</Link>
            <Link href="/admin/personalDetails" className="rounded-md border border-slate-500 px-10 py-3">personal details table</Link>
            <Link href="/admin/task" className="rounded-md border border-slate-500 px-10 py-3">tasks table</Link>
        </div>
    )
}