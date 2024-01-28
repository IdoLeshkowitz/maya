import CommonLayout from "@components/commonLayout";
import {CommonButtonLink} from "@components/button";

export default function Finish() {
    return (
        <CommonLayout>
            <p className="px-20 text-slate-700 flex flex-col items-center gap-14">
            Thank you for participating in the experiment. Click on the link below to complete the experiment:
                <CommonButtonLink href="https://app.prolific.com/submissions/complete?cc=CWZZJ1BY">
                    Click here to complete the experiment
                </CommonButtonLink>
            </p>
        </CommonLayout>
    )
}