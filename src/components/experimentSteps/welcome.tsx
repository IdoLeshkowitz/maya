import {useAppDispatch} from "../../../libs/redux/hooks";
import {CommonButtonLink} from "@components/button";
import CommonLayout from "@components/commonLayout";

export default function Welcome() {
    return (<CommonLayout
            footer={<div className="flex justify-center items-center">
                <CommonButtonLink replace={true} href={"/consent"}>
                    Next
                </CommonButtonLink>
            </div>}
        >
            <h1 className="flex justify-center items-center text-base font-bold text-center text-black">
                Welcome to the experiment!
            </h1>
        </CommonLayout>)
}