"use client"
import Board from "@components/board";
import React, {cloneElement, DetailedReactHTMLElement, useState} from "react";
import {CommonButton} from "@components/button";
import CommonLayout from "@components/commonLayout";
import {useRouter} from "next/navigation";
import Header from "@components/header";
interface TaskInstructionsProps {
    taskId: string
}

export default function TaskInstructions(props: TaskInstructionsProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const router = useRouter()
    const instructionsSteps = [
        "There are two stock portfolios. The money invested in each portfolio was divided equally between several company stocks.",
        "Each company belongs to an industry (such as technology or real estate). On the next screen, you will see information about the two stock portfolios, and the industries each portfolio invested in.",
        <Board
            taskId={props.taskId}
            key={2}
        />,
        `For each company stock, you will see: \n(1) the portfolio that invested in this stock \n(2) the stock's industry \n(3)  By how much a stock's value rose over the last week. \nThis is how it would look like if the value of a company's stock from a certain portfolio and industry rose by 450$ over the last week.`,
        <Board
            key={4}
            taskId={props.taskId}
            snapshot={{indicator: 450, groupIndex: 0, optionSide: 'RIGHT', label: 'company 1'}}
            header={<Header centered={true}>Stock 1</Header>}
        />,
        //"And this is how it would look if the value of the company's stock from a certain portfolio and industry fell.",
        // <Board
        //   key={6}
        //   taskId={props.taskId}
        //   snapshot={{indicator: 'cross', groupIndex: 0, optionSide: 'RIGHT', label: 'company 2'}}
        //   header={<Header centered={true}>Stock 2</Header>}
        ///>,
        `The performance of all the stocks in the portfolios will be presented one after the other. Please pay close attention. After the presentation, you will be asked questions about the portfolios. \n When you are ready, please start the task.`
    ]

    function next() {
        /* check if there are any instructions steps left */
        if (currentStep + 1 < instructionsSteps.length) {
            setCurrentStep(currentStep + 1)
            return
        }
        /* if there are no instructions steps left, step forward */
        router.replace(`/task/${props.taskId}/performance`)
    }

    if (typeof instructionsSteps.at(currentStep) === "string") {
        return (<CommonLayout
            footer={<div className="flex justify-center items-center">
                <CommonButton onClick={next}>
                    Next
                </CommonButton>
            </div>}
        >
            <p className="text-start text-black text-base whitespace-break-spaces px-20">
                {instructionsSteps[currentStep]}
            </p>
        </CommonLayout>)
    }
    if (typeof instructionsSteps.at(currentStep) === "object") {
        const boardElement = instructionsSteps[currentStep] as DetailedReactHTMLElement<any, any>
        return (<>
            {cloneElement(boardElement, {
                children: (<div className="flex items-center justify-center">
                    <CommonButton onClick={next}>
                        Next
                    </CommonButton>
                </div>)
            })}
        </>)
    }
    return null
}