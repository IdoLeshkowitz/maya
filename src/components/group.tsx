import {Snapshot as SnapshotType, SnapshotIndicator} from "@/types/preview";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";

export default function Group({snapshot, groupName}: { snapshot: SnapshotType | null, groupName: string }) {
    return (
        <div className="flex flex-col m-3.5 gap-3">
            {/*frame*/}
            <div className="flex text-black border-2 px-2 py-1">
                {groupName}
            </div>
            {/*snapshot*/}
            {
                snapshot &&
                <div className="flex justify-center items-center text-black">
                    <Snapshot snapshot={snapshot}/>
                </div>
            }
        </div>
    )
}

function Snapshot({snapshot}: { snapshot: SnapshotType }) {
    if (snapshot.indicator === SnapshotIndicator.CROSS) {
        return <XMarkIcon className="w-10 h-10 text-black"/>
    }
    if (snapshot.indicator === SnapshotIndicator.LOADING) {
        return <div className="w-5 h-5 animate-pulse bg-black rounded-full"/>
    }
    if (snapshot.indicator === SnapshotIndicator.CHECK) {
        return <CheckIcon className="w-10 h-10 text-black"/>
    }
    return null
}

