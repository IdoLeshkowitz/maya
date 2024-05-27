"use client"
import {useMemo, useState} from "react";
import {CommonButtonLink} from "@components/button";

export function Form() {
    const [consent, setConsent] = useState(false)
    const href = useMemo(() => {
        if (consent) {
            return "/instructions"
        }
        return "404"
    }, [consent])
    return (<div className="flex flex-col justify-center relative">
        <div className="absolute -top-3 ps-10">
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
            <CommonButtonLink
                replace={true}
                href={href}
                disabled={!consent}
            >
                Next
            </CommonButtonLink>
        </div>
    </div>)
}
