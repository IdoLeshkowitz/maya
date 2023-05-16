'use client'

import {stepForward} from "../../../libs/redux/features/experiment/experimentActions";
import {useAppDispatch} from "../../../libs/redux/hooks";
import {CommonButton} from "@components/button";

export default function Welcome() {
    const dispatch = useAppDispatch()
    return (
        <div className="flex flex-col justify-center items-center relative m-3.5 gap-3">
            <h1 className="text-2xl font-bold text-center text-black">
                Welcome to the experiment!
            </h1>
            {/*start button*/}
            <CommonButton onClick={() => dispatch(stepForward())}>
                Start
            </CommonButton>
        </div>
    )
}