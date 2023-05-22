import {useAppDispatch} from "../../../libs/redux/hooks";
import {useState} from "react";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
import {CommonButton} from "@components/button";
import CommonLayout from "@components/commonLayout";

const experimentInstructions: string[] = [
    "In this experiment, you will be asked to make investment decisions. But first, we will explain some concepts regarding stocks and investments. Please read them and make sure you understand the concepts and their meaning as we use them.",
    "Buying a stock is like buying your share of a company. Every stock has a value, which reflects the value of the company, and this value changes over time.",
    `To diversify investment you can buy a stock <strong>portfolio</strong>, which is like buying several stocks from different companies. <br>A portfolio may include stocks of companies from several industries. <br>The total <strong>profit</strong> from the portfolio will be according to the gains and losses of all of the stocks.`,
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
        <CommonLayout
            footer={
                <div className="flex justify-center items-center">
                    <CommonButton onClick={next}>Next</CommonButton>
                </div>
            }
        >
            <p className="text-start text-base text-black"
               dangerouslySetInnerHTML={{__html: experimentInstructions[currentInstruction]}}>
            </p>
        </CommonLayout>
    )
}

