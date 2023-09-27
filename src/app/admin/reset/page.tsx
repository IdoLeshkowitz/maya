import prisma from "../../../../prisma/client";

async function resetDatabase() {
    function resetTasks() {
        return prisma.task.deleteMany({})
    }

    function resetSessions() {
        return prisma.session.deleteMany({})
    }

    function resetUserDetails() {
        return prisma.userDetails.deleteMany({})
    }

    return Promise.all([
        resetTasks(),
        resetSessions(),
        resetUserDetails()
    ])
}

export default async function ResetPage() {
    await resetDatabase()
    return (
        <div className="min-h-screen bg-white min-w-max pt-5">
            <p className="text-center text-black text-2xl">
                Database reset
            </p>
        </div>
    )
}