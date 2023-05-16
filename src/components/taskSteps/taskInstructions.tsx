import {RootState} from "../../../libs/redux/store";
import {useAppDispatch, useAppSelector} from "../../../libs/redux/hooks";
import Board from "@components/board";
import React, {cloneElement, DetailedReactHTMLElement, useState} from "react";
import {CommonButton} from "@components/button";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";

function getCurrentTaskMetaFromState(state: RootState) {
    return state.tasks.allTasks.at(state.tasks.currentTaskIndex!)!.taskMeta
}

export default function TaskInstructions() {
    const currentTaskMeta = useAppSelector(getCurrentTaskMetaFromState)
    const [currentStep, setCurrentStep] = useState(0)
    const dispatch = useAppDispatch()
    const instructionsSteps = [
        "There are two stock portfolios. Each portfolio initially consisted of an equal proportion of stocks of several companies.",
        "Each company belongs to an industry (such as technology or real estate). On the next screen, you will see information about the two stock portfolios, and the industries each portfolio invested in.",
        <Board taskMeta={currentTaskMeta} key={2}/>,
        `For each company stock, you will see: \n(1) the portfolio that invested in this stock \n(2) the stock's industry \n(3) whether the stock's value rose or fell over the last week. \nThis is how it would look like if the value of a company's stock from a certain portfolio and industry rose over the last week.`,
        <Board
            key={4}
            taskMeta={currentTaskMeta}
            snapshot={{snapshot: {label: 'company 1', indicator: 'check', groupIndex: 0}, side: 'right'}}
        />,
        "And this is how it would look if the value of the company's stock from a certain portfolio and industry fell.",
        <Board
            key={6}
            taskMeta={currentTaskMeta}
            snapshot={{snapshot: {label: 'company 2', indicator: 'cross', groupIndex: 0}, side: 'right'}}
        />,
        `The performance of all the stocks in the portfolios will be presented one after the other. Please pay close attention. After the presentation, you will be asked questions about the portfolios. \n When you are ready please start the task.`,
    ]

    function next() {
        /* check if there are any instructions steps left */
        if (currentStep + 1 < instructionsSteps.length) {
            setCurrentStep(currentStep + 1)
            return
        }
        /* if there are no instructions steps left, step forward */
        dispatch(stepForward())
    }

    if (typeof instructionsSteps.at(currentStep) === "string") {
        return (
            <div className="flex flex-col items-center justify-center text-black gap-10">
                <p className="text-start text-base line-b whitespace-break-spaces">
                    {instructionsSteps[currentStep]}
                </p>
                <CommonButton onClick={next}>
                    Next
                </CommonButton>
            </div>
        )
    }
    if (typeof instructionsSteps.at(currentStep) === "object") {
        const reactElement = instructionsSteps[currentStep] as DetailedReactHTMLElement<any, any>
        return (
            <>
                {
                    cloneElement(reactElement, {children: <CommonButton onClick={next}>Next</CommonButton>})
                }
            </>
        )
    }
    return null
}