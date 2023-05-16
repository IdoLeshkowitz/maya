import {Snapshot as SnapshotType, SnapshotIndicator} from "@/types/performance";
import {CheckIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {FC} from "react";

interface GroupProps {
    snapshot?: SnapshotType | null
    groupName: string
    focused?: boolean
}

const Group: FC<GroupProps> = ({groupName, focused, snapshot}) => {
    const focusedClassName = focused ? 'border-4 border-black bg-white' : 'border'
    return (
        <div className="flex flex-col grow-0 basis-1/3 justify-stretch">
            {/*frame*/}
            <div className={`flex text-black basis-2/3 justify-center items-center shrink-0 ${focusedClassName}`}>
                {groupName}
            </div>
            {/*/!*snapshot*!/*/}
            {
                snapshot &&
                <div className="flex justify-center items-center text-black basis-1/3 grow-0 shrink">
                    <Snapshot snapshot={snapshot}/>
                </div>
            }
        </div>
    )
}

function Snapshot({snapshot}: { snapshot: SnapshotType }) {
    if (snapshot.indicator === SnapshotIndicator.CROSS) {
        return <XMarkIcon className="text-black p-0 md:h-5 lg:h-10 h-0"/>
    }
    if (snapshot.indicator === SnapshotIndicator.LOADING) {
        return <div className="w-5 h-5 animate-pulse bg-black rounded-full"/>
    }
    if (snapshot.indicator === SnapshotIndicator.CHECK) {
        return <CheckIcon className="w-10 h-10 text-black"/>
    }
    return null
}

export default Group