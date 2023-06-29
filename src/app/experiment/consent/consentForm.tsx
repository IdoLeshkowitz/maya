'use client'

import {CommonButton} from "@components/button";
import {useRef} from "react";
import {useRouter} from "next/navigation";


interface ConsentFormProps {
    onConsent: (didConsent: boolean) => any
}

export function ConsentForm(props: ConsentFormProps) {
    const inputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    return (
        <form
            className="flex flex-col justify-center relative">
            <div className="absolute -top-3 ps-10">
                <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    className="mt-1"
                    ref={inputRef}
                />
                <label htmlFor="consent" className="text-black text-md ms-3">
                    I have read and understood the instructions, and would like to participate.
                </label>
                {/*next button*/}
                <div className="flex self-center">
                    <CommonButton
                        onClick={() => {
                            const didConsent = inputRef.current?.checked ?? false
                            props.onConsent(didConsent).catch((e: any) => console.error(e))
                            if (didConsent) return router.push('/experiment/instructions')
                            return router.push('/experiment/end')
                        }}
                    >
                        Next
                    </CommonButton>
                </div>
            </div>
        </form>
    )
}
