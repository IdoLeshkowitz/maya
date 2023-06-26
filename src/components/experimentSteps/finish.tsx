import CommonLayout from "@components/commonLayout";
import {cookies} from "next/headers";

export default function Finish() {
    console.log(cookies().getAll())
    return (
        <CommonLayout>
            <p className="px-20 text-slate-700">
                Thank you for participating in this experiment.<br/>
                🙏
            </p>
        </CommonLayout>
    )
}