import {useAppDispatch} from "../../../libs/redux/hooks";
import {useState} from "react";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
import {CommonButton} from "@components/button";

const experimentInstructions: string[] = [
    "in this experiment you will be asked to complete a series of tasks",
    "buying a stock is like buying a piece of a company",
    "to diversify your portfolio, you should buy stocks from different companies"
]
export default function ExperimentInstructions() {
    const dispatch = useAppDispatch()
    const [currentInstruction, setCurrentInstruction] = useState(0)

    function next() {
        /* check if there are more instructions */
        if (currentInstruction + 1 < experimentInstructions.length) {
            /* if there are more instructions, increment the current instruction */
            setCurrentInstruction(currentInstruction + 1)
            return
        }
        /* if there are no more instructions, move to the next step */
        dispatch(stepForward())
    }

    return (
        <div className="flex flex-col items-center justify-center text-black gap-10">
            <p className="text-center text-base">
                {experimentInstructions[currentInstruction]}
            </p>
            <CommonButton onClick={next}>
                Next
            </CommonButton>
        </div>
    )
}

