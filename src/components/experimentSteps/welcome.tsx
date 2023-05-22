'use client'

import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
import {useAppDispatch} from "../../../libs/redux/hooks";
import {CommonButton} from "@components/button";
import CommonLayout from "@components/commonLayout";

export default function Welcome() {
    const dispatch = useAppDispatch()
    return (
        <CommonLayout
            footer={
                <div className="flex justify-center items-center">
                    <CommonButton onClick={() => dispatch(stepForward())}>Start</CommonButton>
                </div>
            }
        >
            <h1 className="text-base font-bold text-center text-black">
                Welcome to the experiment!
            </h1>
        </CommonLayout>
    )
}