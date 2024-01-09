import {Snapshot as SnapshotType} from "@/types/performance";
import {FC} from "react";

interface GroupProps {
    snapshot?: SnapshotType
    groupName: string
    focused?: boolean
    hidden?: boolean
}

const Group: FC<GroupProps> = ({groupName, focused, hidden, snapshot}) => {
    const focusedClassName = focused ? 'border-4 border-black bg-white' : 'border'
    if (hidden) return (
        <div className="flex text-black items-center relative justify-center aspect-square">
        </div>
    )
    return (
            <div
                className={`flex text-black items-center relative justify-center aspect-square bg-white ${focusedClassName}`}>
                <span className="text-md lg:text-xl xl:text-2xl" style={{whiteSpace: "nowrap"}}>{groupName}</span>
                {
                    snapshot &&
                    <div className="absolute -bottom-32">
                        {
                            snapshot.indicator === "loading" ?
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    className="w-20 h-14 ms-2 lg:scale-125 xl:scale-150"
                                >
                                    <circle cx="2" cy="10" r="2" className="animate-bounce"
                                            style={{animation: 'bounce 1s infinite'}}/>
                                    <circle cx="10" cy="10" r="2" className="animate-bounce"
                                            style={{animation: 'bounce 1s infinite', animationDelay: '50ms'}}/>
                                    <circle cx="18" cy="10" r="2" className="animate-bounce"
                                            style={{animation: 'bounce 1s infinite', animationDelay: '100ms'}}/>
                                </svg>
                                :
                                <span
                                    className="font-bold text-[30px] lg:text-[35px] xl:text-[40px]">{snapshot.indicator.toString()}</span>
                        }
                    </div>
                }
            </div>
    )
}

export default Group