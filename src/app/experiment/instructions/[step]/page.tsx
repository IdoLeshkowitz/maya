import CommonLayout from "@components/commonLayout";
import {ReactNode} from "react";
import {CommonLink} from "@components/button";
import {cookies} from "next/headers";

const experimentInstructions: ReactNode[] = [
    <span key="0">In this experiment, you will be asked to make investment decisions. But first, we will explain some concepts regarding stocks and investments. Please read them and make sure you understand the concepts and their meaning as we use them.</span>,
    <span key="1">Buying a stock is like buying your share of a company. Every stock has a value, which reflects the value of the company, and this value changes over time.</span>,
    <span key="2">To diversify investment you can buy a stock <strong>portfolio</strong>, which is like buying several stocks from different companies.<br/>A portfolio may include stocks of companies from several industries.<br/>The total <strong>profit</strong> from the portfolio will be according to the gains and losses of all of the stocks.</span>,
]
export default function InstructionsPage({params}: { params: { step: string } }) {
    const experimentSessionId = cookies().get("experimentSessionId")?.value!
    // prisma.app.update({
    //     where: {
    //         appName_experimentSessionId: {
    //             experimentSessionId: experimentSessionId,
    //             appName            : "instructions"
    //         }
    //     },
    //     data : {
    //         currentStep: parseInt(params.step)
    //     }
    // }).catch(e => console.error(e))

    function getNextHref() {
        // const nextSlug = parseInt(params.step) + 1
        // if (nextSlug < experimentInstructions.length) {
        //     return `/experiment/instructions/${nextSlug}`
        // }
        return "/experiment/task/0/start"
    }

    return (
        <CommonLayout
            footer={
                <div className="flex justify-center items-center">
                    <CommonLink href={getNextHref()}>
                        Next
                    </CommonLink>
                </div>
            }
        >
            <p className="text-start text-black text-base whitespace-break-spaces px-20">
                {experimentInstructions[parseInt(params.step)]}
            </p>
        </CommonLayout>
    )
}