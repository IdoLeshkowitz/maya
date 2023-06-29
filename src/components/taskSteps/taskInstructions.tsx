// import {RootState} from "../../../libs/redux/store";
// import {useAppDispatch, useAppSelector} from "../../../libs/redux/hooks";
// import Board from "@components/board";
// import React, {cloneElement, DetailedReactHTMLElement, useState} from "react";
// import {CommonButton} from "@components/button";
// import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
// import CommonLayout from "@components/commonLayout";
//
// function getCurrentTaskMetaFromState(state: RootState) {
//     return state.tasks.tasksStates.at(state.tasks.currentTaskIndex!)!.taskMeta
// }
//
// export default function TaskInstructions() {
//     const currentTaskMeta = useAppSelector(getCurrentTaskMetaFromState)
//     const [currentStep, setCurrentStep] = useState(0)
//     const dispatch = useAppDispatch()
//     const instructionsSteps = [
//         "There are two stock portfolios. Each portfolio initially consisted of an equal proportion of stocks of several companies.",
//         "Each company belongs to an industry (such as technology or real estate). On the next screen, you will see information about the two stock portfolios, and the industries each portfolio invested in.",
//         <Board taskMeta={currentTaskMeta} key={2}/>,
//         `For each company stock, you will see: \n(1) the portfolio that invested in this stock \n(2) the stock's industry \n(3) whether the stock's value rose or fell over the last week. \nThis is how it would look like if the value of a company's stock from a certain portfolio and industry rose over the last week.`,
//         <Board
//             key={4}
//             taskMeta={currentTaskMeta}
//             snapshot={{indicator: 'check', groupIndex: 0, optionSide: 'right', label: 'company 1'}}
//         />,
//         "And this is how it would look if the value of the company's stock from a certain portfolio and industry fell.",
//         <Board
//             key={6}
//             taskMeta={currentTaskMeta}
//             snapshot={{indicator: 'cross', groupIndex: 0, optionSide: 'right', label: 'company 2'}}
//         />,
//         `The performance of all the stocks in the portfolios will be presented one after the other. Please pay close attention. After the presentation, you will be asked questions about the portfolios. \n When you are ready please start the task.`,
//     ]
//
//     function next() {
//         /* check if there are any instructions steps left */
//         if (currentStep + 1 < instructionsSteps.length) {
//             setCurrentStep(currentStep + 1)
//             return
//         }
//         /* if there are no instructions steps left, step forward */
//         dispatch(stepForward())
//     }
//
//     if (typeof instructionsSteps.at(currentStep) === "string") {
//         return (
//             <CommonLayout
//                 footer={
//                     <div className="flex justify-center items-center">
//                         <CommonButton onClick={next}>
//                             Next
//                         </CommonButton>
//                     </div>
//                 }
//             >
//                 <p className="text-start text-black text-base whitespace-break-spaces px-20">
//                     {instructionsSteps[currentStep]}
//                 </p>
//             </CommonLayout>
//         )
//     }
//     if (typeof instructionsSteps.at(currentStep) === "object") {
//         const boardElement = instructionsSteps[currentStep] as DetailedReactHTMLElement<any, any>
//         return (
//             <>
//                 {
//                     cloneElement(boardElement, {
//                         children: (
//                             <div className="flex items-center justify-center">
//                                 <CommonButton onClick={next}>
//                                     Next
//                                 </CommonButton>
//                             </div>
//                         )
//                     })
//                 }
//             </>
//         )
//     }
//     return null
// }