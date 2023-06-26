'use client'

import {CommonButton} from "@components/button";
import {useRef} from "react";
import {redirect, useRouter} from "next/navigation";

export default function ConsentForm() {
    const acceptRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    function onSubmit() {
        const accept = acceptRef.current?.checked
        if (!accept) return router.push('end')
    }

    return (
        <div className="flex flex-col justify-center relative">
            <div className="absolute -top-3 ps-10">
                <input
                    ref={acceptRef}
                    type="checkbox"
                    id="consent"
                    name="consent"
                    className="mt-1"
                />
                <label htmlFor="consent" className="text-black text-md ms-3">
                    I have read and understood the instructions, and would like to participate.
                </label>
            </div>
            {/*next button*/}
            <div className="flex self-center">
                <CommonButton onClick={onSubmit}>
                    Next
                </CommonButton>
            </div>
        </div>
    )
}