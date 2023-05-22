'use client'
import {useState} from "react";
import {useAppDispatch} from "../../../libs/redux/hooks";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
import CommonLayout from "@components/commonLayout";
import {CommonButton} from "@components/button";

export default function Consent() {
    const [consent, setConsent] = useState(false)
    const dispatch = useAppDispatch()
    return (
        <CommonLayout
            header={<ConsentHeader/>}
            footer={<ConsentFooter consent={consent} setConsent={setConsent} dispatch={dispatch}/>}
        >
            <div className="overflow-scroll border-black border p-5 rounded whitespace-pre-wrap ">
                <div className="flex flex-col gap-10">
                    <p className="text-black text-md">
                        You are invited to participate in a web-based online survey on human perception.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Benefits<br/></span>
                        Although this study will not benefit you personally, we hope that our results will add to
                        the
                        knowledge about human behaviour.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Risks<br/></span>
                        There are no foreseeable risks involved in participating in this study other than those
                        encountered in day-to-day life.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Confidentiality<br/></span>
                        Only the researchers involved in this study will have access to the information you provide.
                        The
                        researcher will not know your name, and no identifying information will be connected to your
                        survey answers in any way. The survey is therefore anonymous. However, your account is
                        associated with a Prolific number that the researcher has in order to pay you. For this
                        reason,
                        the fact of your participation in the research is technically considered “confidential”
                        rather
                        than truly anonymous.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Participation<br/></span>
                        Participation in this study is completely voluntary. You are free to decline to participate
                        and
                        to end participation at any time for any reason.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Contact<br/></span>
                        If you have questions at any time about the study or the procedures, you may contact me or
                        my
                        research supervisor, Professor Ran Hassin via email at greenlab.huji@gmail.com.
                    </p>
                    <p className="text-black text-md">
                        <span className="text-black text-lg">Electronic Consent<br/></span>
                        Please select your choice below. Clicking on the “Agree” button indicates that
                    </p>
                    <p className="text-black text-md ">
                        {`* You have read the above information\n* You voluntarily agree to participate\n* You are 18 years of age or older`}
                    </p>
                    <p className="text-black text-md">
                        If you do not want to participate please close the window. Your data will not be used either
                        way.
                    </p>
                </div>
            </div>
        </CommonLayout>
    )
}


function ConsentFooter({setConsent, consent, dispatch}: {
    setConsent: Function,
    consent: boolean,
    dispatch: Function
}) {
    return (
        <div className="flex flex-col justify-between gap-4">
            <div>
                <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={consent}
                    onChange={() => setConsent(!consent)}
                    className="mt-1"
                />
                <label htmlFor="consent" className="text-black text-md ms-3">
                    I have read and understood the instructions, and would like to participate.
                </label>
            </div>
            {/*next button*/}
            <div className="flex self-center">
                <CommonButton
                    onClick={() => {
                        if (consent) {
                            dispatch(stepForward())
                        }
                    }}
                    disabled={!consent}
                >
                    Next
                </CommonButton>
            </div>
        </div>
    )
}

function ConsentHeader() {
    return (
        <h2 className="text-black text-base text-center">Informed Consent</h2>
    )
}