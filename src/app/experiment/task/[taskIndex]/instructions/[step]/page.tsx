import CommonLayout from "@components/commonLayout";
import {cookies} from "next/headers";
import {Board} from "@components/board";
import React, {ReactNode} from "react";
import {CommonLink} from "@components/button";
import {findFirstTask} from "@services/task";
import {prisma} from "@client";

const getCurrentTask = async (prolificId: string, taskIndex: string) => {
    try {
        return await findFirstTask({
            belongsToSession : {
                prolificId
            },
            orderInExperiment: parseInt(taskIndex)
        })
    } catch (e) {
        console.log(e)
    }
}


interface TaskInstructionsPageParams {
    taskIndex: string,
    step: string,
}

export default async function TaskInstructionsPage({params}: { params: TaskInstructionsPageParams }) {
    const prolificId = cookies().get("prolificId")?.value!
    const currentTask = await getCurrentTask(prolificId, params.taskIndex)
    let CurrentBoard = (props: any) => {
        return (
            <Board
                {...props}
                leftOptionName={currentTask!.leftOptionLabel}
                rightOptionName={currentTask!.rightOptionLabel}
                leftOptionColor={currentTask!.leftOptionColor}
                rightOptionColor={currentTask!.rightOptionColor}
                leftOptionGroupsNames={currentTask!.leftOptionGroupsNames}
                rightOptionGroupsNames={currentTask!.rightOptionGroupsNames}
                footer={
                    <div className="flex justify-center items-center">
                        <CommonLink href={getNextHref(parseInt(params.step), Object.keys(steps).length)}>
                            Next
                        </CommonLink>
                    </div>
                }
            />
        )
    }
    const steps: { [key: number]: { content: ReactNode, layout: string } } = {
        0: {
            layout : 'common',
            content: (
                <span key={1}>There are two stock portfolios. Each portfolio initially consisted of an equal proportion of stocks of several companies.</span>
            ),
        },
        1: {
            layout : 'common',
            content: (
                <span key={2}>Each company belongs to an industry (such as technology or real estate). On the next screen, you will see information about the two stock portfolios, and the industries each portfolio invested in.</span>
            )
        },
        2: {
            layout : 'board',
            content: (<CurrentBoard key={2}/>)
        },
        3: {
            layout : 'common',
            content: (
                <div key={3}>
                    <span>For each company stock, you will see:</span>
                    <ol>
                        <li>(1) the portfolio that invested in this stock</li>
                        <li>(2) the stock&rsquo;s industry</li>
                        <li>(3) whether the stock&rsquo;s value rose or fell over the last week.</li>
                    </ol>
                    This is how it would look like if the value of a company&rsquo;s stock from a certain portfolio and
                    industry rose over the last week.
                </div>
            )
        },
        4: {
            layout : 'board',
            content: (
                <CurrentBoard key={4}
                              currentSnapshot={{indicator: 'check', groupIndex: 0, appearsAsRightAtTaskId: 'true', label: 'company 1'}}/>
            )
        },
        5: {
            layout : 'common',
            content: (
                <span key={5}>And this is how it would look if the value of the company&rsquo;s stock from a certain portfolio and industry fell.</span>
            )
        },
        6: {
            layout : 'board',
            content: (
                <CurrentBoard key={6}
                              currentSnapshot={{indicator: 'cross', groupIndex: 0, appearsAsRightAtTaskId: 'true', label: 'company 2'}}/>
            )
        },
        7: {
            layout : 'common',
            content: (
                <span key={7}>The performance of all the stocks in the portfolios will be presented one after the other. Please pay close attention. After the presentation, you will be asked questions about the portfolios. When you are ready please start the task.</span>
            )
        }
    }
    const getNextHref = (stepIndex: number, numberOfSteps: number) => {
        /* if this is the lest navigate to previews */
        if (stepIndex >= numberOfSteps - 1) {
            return `/experimentApps/task/${params.taskIndex}/previews/left/0`
        }
        /* if more steps left navigate to next step */
        const nextStep = stepIndex + 1;
        return nextStep.toString()
    }
    const currentStep = steps[parseInt(params.step)]
    prisma.task.update({
        where: {
            id: currentTask!.id
        },
        data : {
            currentApp : "instructions",
            currentStep: parseInt(params.step)
        }
    }).catch((e) => {
        console.log(e)
    })
    if (currentStep?.layout === "board") {
        return currentStep.content
    }
    if (currentStep?.layout === "common") {
        return (
            <CommonLayout
                footer={
                    <div className="flex justify-center items-center">
                        <CommonLink href={getNextHref(parseInt(params.step), Object.keys(steps).length)}>
                            Next
                        </CommonLink>
                    </div>
                }
            >
                <p className="text-start text-black text-base whitespace-break-spaces px-20">
                    {currentStep.content}
                </p>
            </CommonLayout>
        )
    }
}