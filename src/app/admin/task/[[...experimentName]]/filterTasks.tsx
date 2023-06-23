'use client'
import {useRef} from "react";
import {useRouter} from "next/navigation";
import {CommonButton} from "@components/button";

export default function FilterTasks(props:{options : string []}){
    const selectRef = useRef<HTMLSelectElement>(null)
    const router = useRouter()
    function onSubmit(){
        const selectedOption = selectRef.current?.value
        router.push(`/admin/task/${selectedOption}`)
    }

    return (
        <div className="flex flex-col justify-center items-start bg-whites p-2">
            <label className="text-slate-700" htmlFor="experiment-name-select">Please select an experiment</label>
            <div className="flex gap-5">
                <select ref={selectRef} className="border border-slate-500 rounded-md px-6 py-3 text-slate-700" id="experiment-name-select">
                    {props.options.map((option) => (
                        <option key={option} value={option} className="text-slate-700">{option}</option>
                    ))}
                </select>
                <CommonButton onClick={onSubmit}>Submit</CommonButton>
            </div>
        </div>
    )
}