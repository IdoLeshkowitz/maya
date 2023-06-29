import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {Prisma} from "@prisma/client";
import {splitArray} from "@/utils/splitArray";
import {shuffleConfig} from "@/utils/shuffleConfig";
import {prisma} from "@client";
import experimentConfig from "@public/experimentConfig.json";

export async function GET(request: NextRequest) {
    const prolificId = request.nextUrl.searchParams.get("external_id") ?? cookies().get("prolificId")?.value
    if (!prolificId) {
        return NextResponse.redirect(`${request.nextUrl.origin}/missingProlificId`)
    }
    const experimentSession = await createOrUpdateExperimentSession(experimentConfig, prolificId)
    cookies().set("prolificId", prolificId)
    cookies().set("experimentSessionId", experimentSession.id)
    return NextResponse.redirect(`${request.nextUrl.origin}/experiment`)
}

function createTasksFromConfig(config: any, prolificId: string): Prisma.TaskUncheckedCreateNestedManyWithoutBelongsToSessionInput {
    return {
        create: config.previews.map((preview: any, i: number): Prisma.TaskUncheckedCreateWithoutBelongsToSessionInput => {
            return {
                orderInExperiment     : i,
                leftOptionColor       : config.optionsColors[i][0],
                rightOptionColor      : config.optionsColors[i][1],
                leftOptionLabel       : config.optionsNames[i][0],
                rightOptionLabel      : config.optionsNames[i][1],
                leftOptionGroupsNames : splitArray(config.groupsNames[i])[0] as string[],
                rightOptionGroupsNames: splitArray(config.groupsNames[i])[1] as string[],
                overallPreviewName    : config.previews[i].overallPreviewName,
                leftPreviewGroupName  : config.previews[i].options[0].groupName,
                rightPreviewGroupName : config.previews[i].options[1].groupName,
                leftPreviewSimpleName : config.previews[i].options[0].simpleName,
                rightPreviewSimpleName: config.previews[i].options[1].simpleName,
                leftSnapshots         : {
                    create: config.previews[i].options[0].snapshots.map((snapshot: any): Prisma.SnapshotUncheckedCreateWithoutAppearsAsLeftAtTaskInput => {
                        return {
                            label     : snapshot.label,
                            indicator : snapshot.indicator,
                            groupIndex: snapshot.groupIndex,
                        }
                    })
                },
                rightSnapshots        : {
                    create: config.previews[i].options[1].snapshots.map((snapshot: any): Prisma.SnapshotUncheckedCreateWithoutAppearsAsRightAtTaskInput => {
                        return {
                            label     : snapshot.label,
                            indicator : snapshot.indicator,
                            groupIndex: snapshot.groupIndex,
                        }
                    })
                },
            }

        })
    }
}

async function createOrUpdateExperimentSession(config: any, prolificId: string) {
    /* shuffle config */
    const shuffledConfig = shuffleConfig(config)
    /* create or update experiment session */
    const tasksToCreate = createTasksFromConfig(shuffledConfig, prolificId)
    try {
        return await prisma.experimentSession.upsert({
            where  : {
                prolificId
            },
            create : {
                prolificId,
                createdAt        : new Date().toUTCString(),
                experimentName   : config.experimentName,
                experimentVersion: config.experimentVersion,
                variantName      : config.variantName,
                tasks            : tasksToCreate,
            },
            update : {},
            include: {
                apps: true
            }
        })
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}
