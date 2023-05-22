import {Snapshot as SnapshotType, SnapshotIndicator} from "@/types/performance";
import {FC} from "react";

interface GroupProps {
    snapshot?: SnapshotType
    groupName: string
    focused?: boolean
    hidden?: boolean
}

const Group: FC<GroupProps> = ({groupName, focused, snapshot, hidden}) => {
    const focusedClassName = focused ? 'border-4 border-black bg-white' : 'border'
    if (hidden) return (
        <div className="flex text-black items-center relative justify-center aspect-square">
        </div>
    )
    return (
        <>
            <div
                className={`flex text-black items-center relative justify-center aspect-square bg-white ${focusedClassName}`}>
                <span className="text-sm lg:text-lg xl:text-lg 2xl:text-xl" style={{whiteSpace:"nowrap"}}>{groupName}</span>
                {
                    snapshot &&
                    <div className="absolute -bottom-32">
                        <Snapshot snapshot={snapshot}/>
                    </div>
                }
            </div>
        </>
    )
}

function Snapshot({snapshot}: { snapshot: SnapshotType }) {
    if (snapshot.indicator === SnapshotIndicator.CROSS) {
        return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3"
                    stroke="currentColor" className="w-20 h-20 text-red ms-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>

    }
    if (snapshot.indicator === SnapshotIndicator.LOADING) {
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" strokeWidth="3"
                    stroke="currentColor" className="w-20 h-14 ms-2">
            <circle cx="2" cy="10" r="2" className="animate-bounce" style={{animation: 'bounce 1s infinite'}}/>
            <circle cx="10" cy="10" r="2" className="animate-bounce"
                    style={{animation: 'bounce 1s infinite', animationDelay: '50ms'}}/>
            <circle cx="18" cy="10" r="2" className="animate-bounce"
                    style={{animation: 'bounce 1s infinite', animationDelay: '100ms'}}/>
        </svg>

    }
    if (snapshot.indicator === SnapshotIndicator.CHECK) {
        return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3"
                    stroke="currentColor" className="w-20 h-20 text-green ms-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
        </svg>

    }
    return null
}

export default Group