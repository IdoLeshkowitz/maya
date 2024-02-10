import {NextRequest, NextResponse} from "next/server";
import experimentConfig from "@public/experimentConfig.json"
import {pickRandomConfigAndShuffle} from "@/utils/shuffleConfig";
import prisma from "../../prisma/client";
import {ExperimentStep, Prisma, TaskStep} from "@prisma/client";
import {Config} from "@/types/config";
import {cookies} from "next/headers";
import {splitArray} from "@/utils/splitArray";
import TaskCreateManySessionInput = Prisma.TaskCreateManySessionInput;

const tasksCreateManyInput = (config: Config): TaskCreateManySessionInput[] => {
    const tasksCreateManyInput: TaskCreateManySessionInput[] = []
    for (let i = 0; i < config.numberOfTasks; i++) {
        tasksCreateManyInput.push({
            orderInExperiment: i,
            step: TaskStep.START,
            leftOption: {
                name: config.optionsNames[i][0],
                color: config.optionsColors[i][0],
                groupsNames: splitArray(config.groupsNames[i])[0],
                performance: JSON.stringify(config.performance[i]["options"][0]),
            },
            rightOption: {
                name: config.optionsNames[i][1],
                color: config.optionsColors[i][1],
                groupsNames: splitArray(config.groupsNames[i])[1],
                performance: JSON.stringify(config.performance[i]["options"][1]),
            },
            overallPreviewName: config.performance[i]["overallPreviewName"],
        })
    }
    return tasksCreateManyInput
}

async function upsertSession(prolificId: string) {
    const shuffledConfig = pickRandomConfigAndShuffle(experimentConfig as Config[])
    try {
        return await prisma.experimentSession.upsert({
            where: {prolificId: prolificId}, create: {
                prolificId: prolificId,
                variantName: shuffledConfig.variantName,
                experimentVersion: shuffledConfig.experimentVersion,
                experimentName: shuffledConfig.experimentName,
                tasks: {
                    createMany: {
                        data: tasksCreateManyInput(shuffledConfig)
                    }
                }
            }, update: {}
        })
    } catch (e) {
        console.log(e)
    }
}

export async function GET(request: NextRequest) {
    const prolificID = request.nextUrl.searchParams.get("external_id") ?? cookies().get("prolificId")?.value
    if (!prolificID) {
        return NextResponse.json("missing prolific id")
    }
    if (prolificID === "-1825") {
        cookies().set("sysma", "1825")
        return NextResponse.redirect(`${request.nextUrl.origin}/admin`)
    }
    cookies().set("prolificId", prolificID)
    const experimentSession = await upsertSession(prolificID)
    const step = experimentSession?.step ?? ExperimentStep.WELCOME

    if (step === ExperimentStep.WELCOME) {
        return NextResponse.redirect(`${request.nextUrl.origin}/welcome`)
    }
    if (step === ExperimentStep.CONSENT) {
        return NextResponse.redirect(`${request.nextUrl.origin}/consent`)
    }
    if (step === ExperimentStep.TASKS) {
        return NextResponse.redirect(`${request.nextUrl.origin}/task`)
    }
    if (step === ExperimentStep.FINISH) {
        return NextResponse.redirect(`${request.nextUrl.origin}/finish`)
    }
    if (step === ExperimentStep.PERSONAL_DETAILS) {
        return NextResponse.redirect(`${request.nextUrl.origin}/personalDetails`)
    }
    return NextResponse.json("error directing")
}