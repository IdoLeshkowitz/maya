import {Inter} from 'next/font/google'
import prisma from "@client";
import {shuffleConfig} from "@/utils/shuffleConfig";
import {Prisma} from "@prisma/client";
import experimentConfig from "@public/experimentConfig.json";
import CommonLayout from "@components/commonLayout";
import {CommonLink} from "@components/button";

const inter = Inter({subsets: ['latin']})

function createTasksFromConfig(config: any, prolificId: string): Prisma.TaskUncheckedCreateNestedManyWithoutBelongsToSessionInput {
    return {
        create: config.previews.map((preview: any, i: number): Prisma.TaskUncheckedCreateWithoutBelongsToSessionInput => {
            return {
                leftOptionColor       : config.optionsColors[i][0],
                rightOptionColor      : config.optionsColors[i][1],
                leftOptionLabel       : config.optionsNames[i][0],
                rightOptionLabel      : config.optionsNames[i][1],
                leftOptionGroupsNames : config.groupsNames[i],
                rightOptionGroupsNames: config.groupsNames[i],
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
            where : {
                prolificId
            },
            create: {
                prolificId,
                createdAt        : new Date().toUTCString(),
                experimentName   : config.experimentName,
                experimentVersion: config.experimentVersion,
                variantName      : config.variantName,
                tasks            : tasksToCreate,
            },
            update: {}
        })
    } catch (e) {
        console.error(e)
        return Promise.reject(e)
    }
}

export default async function Home(props: { searchParams: { external_id: string } }) {

    const experimentSession = await createOrUpdateExperimentSession(experimentConfig, props.searchParams.external_id)
    if (!experimentSession.currentApp) {
        return (
            <CommonLayout
                footer={
                    <div className="flex justify-center items-center">
                        <CommonLink href="experimentApps/consent">Start</CommonLink>
                    </div>
                }
            >
                <h1 className="flex justify-center items-center text-base font-bold text-center text-black">
                    Welcome to the experiment!
                </h1>

            </CommonLayout>
        )
    }

    return null
}

export const dynamic = 'force-dynamic'
