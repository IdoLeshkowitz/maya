"use client"
import {useState} from "react";
import {CommonButton, CommonButtonLink} from "@components/button";
import CommonLayout from "@components/commonLayout";
import {useRouter} from "next/navigation";

const instructions: string[] = ["In this experiment, you will be asked to make investment decisions. But first, we will explain some concepts regarding stocks and investments. Please read them and make sure you understand the concepts and their meaning as we use them.", "Buying a stock is like buying your share of a company. Every stock has a value, which reflects the value of the company, and this value changes over time.", `To diversify investment you can buy a stock <strong>portfolio</strong>, which is like buying several stocks from different companies. <br>A portfolio may include stocks of companies from several industries. <br>The total <strong>profit</strong> from the portfolio will be according to the gains and losses of all the stocks.`,]
export default function ExperimentInstructions() {
    const [currentInstruction, setCurrentInstruction] = useState(0)
    const router = useRouter()

    function next() {
        /* check if there are more instructions */
        if (currentInstruction + 1 < instructions.length) {
            /* if there are more instructions, increment the current instruction */
            setCurrentInstruction(currentInstruction + 1)
            return
        }
    }

    return (<CommonLayout
        footer={<div className="flex justify-center items-center">
            {/*<CommonButton onClick={next}>Next</CommonButton>*/}
            { currentInstruction + 1 < instructions.length && <CommonButton onClick={next}>Next</CommonButton>}
            { currentInstruction + 1 === instructions.length && <CommonButtonLink replace={true} href="/task">Start</CommonButtonLink>}
        </div>}
    >
        <p
            className="text-start text-black text-base whitespace-break-spaces px-20"
            dangerouslySetInnerHTML={{__html: instructions[currentInstruction]}}
        >
        </p>
    </CommonLayout>)
}

