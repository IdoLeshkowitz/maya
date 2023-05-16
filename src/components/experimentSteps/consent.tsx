'use client'
import {useState} from "react";
import {useAppDispatch} from "../../../libs/redux/hooks";
import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";

export default function Consent() {
    const [consent, setConsent] = useState(false)
    const dispatch = useAppDispatch()
    return (
        <div className="flex flex-col justify-evenly items-center basis-1/2 py-5">
            <h2 className="text-black text-2xl">Informed Consent</h2>
            <div className="overflow-scroll basis-1/2 border-black border p-5 rounded">
                <div className="flex flex-col gap-10">
                    <p className="text-black text-base">
                        <h4 className="text-black text-lg">Benefits</h4>
                        You will be contributing to the development of a new tool for
                        measuring the quality of machine translation. You will also be
                        helping to improve the quality of machine translation in the
                    </p>
                    <p className="text-black text-base">
                        <h4 className="text-black text-lg">Risks</h4>
                        There are no risks associated with this study.
                    </p>
                    <p className="text-black text-base">
                        <h4 className="text-black text-lg">Confidentiality</h4>
                        Your data will be stored in a secure database and will not be
                        shared with anyone outside of the research team. Your data will
                        be anonymized and will not be linked to your name or email
                        address.
                    </p>
                </div>
                {/* i agree checkbox */}
            </div>
            <div className="flex flex-row items-start gap-2">
                <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={consent}
                    onChange={() => setConsent(!consent)}
                    className="mt-1"
                />
                <label htmlFor="consent" className="text-black text-base">
                    I agree to participate in this study.
                </label>
            </div>
            {/*next button*/}
            <button
                className={`text-black rounded-full px-5 py-2 border ${consent ? 'bg-blue bg-opacity-50 hover:scale-110 scale-105':'cursor-not-allowed'} transition ease-in-out delay-75 duration-500`}
                onClick={() => {
                    if (consent) {
                        dispatch(stepForward())
                    }
                }}
            >
                Next
            </button>
        </div>
    )
}