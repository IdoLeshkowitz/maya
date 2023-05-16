import {TaskMeta} from "@/types/taskMeta";
import Option from "@components/option";
import Group from "@components/group";
import {Snapshot} from "@/types/performance";
import {ReactNode} from "react";

interface BoardProps {
    taskMeta: TaskMeta,
    snapshot?: {
        side: 'left' | 'right',
        snapshot: Snapshot
    }
    children?: ReactNode
    title?: string
    onOptionSelected?: (side: 'left' | 'right') => void
}

export default function Board(props: BoardProps) {
    const {taskMeta, children, snapshot, title, onOptionSelected} = props
    return (
        <div className="flex flex-col gap-5 justify-evenly container items-center">
            {/*title*/}
            {
                <div className="flex flex-col items-center justify-center justify-self-start">
                    <h1 className="text-2xl font-bold text-center text-black">
                        {title || snapshot?.snapshot.label}
                    </h1>
                </div>
            }
            <div className="flex flex-row self-stretch justify-evenly basis-1/3">
                {/*left option*/}
                <Option
                    tabIndex={0}
                    selectable={!!onOptionSelected}
                    onClick={onOptionSelected ? () => onOptionSelected("left") : undefined}
                    optionName={taskMeta.leftOption.optionName}
                    optionColor={taskMeta.leftOption.optionColor}
                    hidden={snapshot && snapshot.side === "right"}
                >
                    {
                        taskMeta.leftOption.groupsNames.map((groupName, index) => {
                            return (
                                <Group
                                    key={index}
                                    groupName={groupName}
                                    snapshot={snapshot && snapshot.side === "left" && snapshot.snapshot.groupIndex === index ? snapshot.snapshot : null}
                                />
                            )
                        })
                    }
                </Option>
                {/*right option*/}
                <Option
                    tabIndex={1}
                    selectable={!!onOptionSelected}
                    onClick={onOptionSelected ? () => onOptionSelected('right') : undefined}
                    optionName={taskMeta.rightOption.optionName}
                    optionColor={taskMeta.rightOption.optionColor}
                    hidden={snapshot && snapshot.side === "left"}
                >
                    {
                        taskMeta.rightOption.groupsNames.map((groupName, index) => {
                            return (
                                <Group
                                    key={index}
                                    groupName={groupName}
                                    snapshot={snapshot && snapshot.side === "right" && snapshot.snapshot.groupIndex === index ? snapshot.snapshot : null}
                                />
                            )
                        })
                    }
                </Option>
            </div>
            {children}
        </div>
    )
}