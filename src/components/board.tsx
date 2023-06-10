import {TaskMeta} from "@/types/taskMeta";
import Option from "@components/option";
import Group from "@components/group";
import {Snapshot} from "@/types/preview";
import React, {ReactNode} from "react";
import '../app/globals.css'

interface BoardProps {
    taskMeta: TaskMeta,
    snapshot?: Snapshot
    children?: ReactNode
    header?: ReactNode
    onOptionSelected?: (side: 'left' | 'right') => void
}

export default function Board(props: BoardProps) {
    const {taskMeta, children, snapshot, header, onOptionSelected} = props
    const optionsContainerStyle = {
        display            : 'grid',
        gridTemplateColumns: "repeat(2,1fr)",
        gridGap            : "1rem",
    }
    const boardContainerStyle = {
        display         : 'grid',
        gridTemplateRows: ".5fr 3fr 1fr",
        gridGap         : "1rem",
    }
    return (
        <main className="py-8 px-10 bg-white h-screen" style={boardContainerStyle}>
            {/* header */}
            <div className="px-20">
                {header ?? <div/>}
            </div>
            {/*options*/}
            <div style={optionsContainerStyle}>
                {/*left option*/}
                <Option
                    tabIndex={0}
                    onClick={onOptionSelected ? () => onOptionSelected("left") : undefined}
                    optionName={taskMeta.leftOption.optionName}
                    optionColor={taskMeta.leftOption.optionColor}
                >
                    {
                        taskMeta.leftOption.groupsNames.map((groupName, index) => {
                            return (
                                <Group
                                    key={index}
                                    groupName={groupName}
                                    snapshot={(snapshot && snapshot.optionSide === "left" && snapshot.groupIndex === index) ? snapshot : undefined}
                                    hidden={snapshot && (snapshot?.optionSide === "right" || snapshot?.groupIndex !== index)}
                                />
                            )
                        })
                    }
                </Option>
                {/*right option*/}
                <Option
                    tabIndex={1}
                    onClick={onOptionSelected ? () => onOptionSelected("right") : undefined}
                    optionName={taskMeta.rightOption.optionName}
                    optionColor={taskMeta.rightOption.optionColor}
                >
                    {
                        taskMeta.rightOption.groupsNames.map((groupName, index) => {
                            return (
                                <Group
                                    key={index}
                                    groupName={groupName}
                                    snapshot={(snapshot && snapshot.optionSide === "right" && snapshot.groupIndex === index) ? snapshot : undefined}
                                    hidden={snapshot && (snapshot?.optionSide === "left" || snapshot?.groupIndex !== index)}
                                />
                            )
                        })
                    }
                </Option>
            </div>

            {/*footer*/}
            {children}
        </main>
    )
}