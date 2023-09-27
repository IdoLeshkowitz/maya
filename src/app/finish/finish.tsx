import CommonLayout from "@components/commonLayout";
import {CommonButtonLink} from "@components/button";

export default function Finish() {
    return (
        <CommonLayout>
            <p className="px-20 text-slate-700 flex flex-col items-center gap-14">
                Thank you for participating in the experiment. Click on the link below to receive credit for the experiment:
                <CommonButtonLink href="https://huji.sona-systems.com/webstudy_credit.aspx?experiment_id=2041&credit_token=c594f92c170840049b20adfe8da478a3">
                    Click here to receive credit
                </CommonButtonLink>
            </p>
        </CommonLayout>
    )
}