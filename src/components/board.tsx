import {TaskMeta} from "@/types/taskMeta";
import Option from "@components/option";
import Group from "@components/group";
import {Snapshot} from "@/types/performance";
import {ReactNode} from "react";
import '../app/globals.css'

interface BoardProps {
    taskMeta: TaskMeta,
    snapshot?: Snapshot
    children?: ReactNode
    title?: string
    onOptionSelected?: (side: 'left' | 'right') => void
    footer?: ReactNode
}

export default function Board(props: BoardProps) {
    const {taskMeta, children, snapshot, title, onOptionSelected} = props
    const optionsContainerStyle = {
        display            : 'grid',
        gridTemplateColumns: "repeat(2,1fr)",
        gridGap            : "1rem",
    }
    const boardContainerStyle = {
        display         : 'grid',
        gridTemplateRows: "1fr 1.5fr 1fr",
        gridGap         : "1rem",
    }
    return (
        <main className="container my-10" style={boardContainerStyle}>
            {/*title*/}
            <h1 className="flex justify-center items-center text-2xl font-bold text-start text-black whitespace-pre-wrap">
                {title || snapshot?.label}
            </h1>
            {/*options*/}
            <div style={optionsContainerStyle}>
                {/*left option*/}
                <Option
                    tabIndex={0}
                    onClick={onOptionSelected ? () => onOptionSelected("left") : undefined}
                    optionName={taskMeta.leftOption.optionName}
                    optionColor={taskMeta.leftOption.optionColor}
                    hidden={!!(snapshot && snapshot.optionSide === "right")}
                >
                    {
                        taskMeta.leftOption.groupsNames.map((groupName, index) => {
                            return (
                                <Group
                                    key={index}
                                    groupName={groupName}
                                    snapshot={(snapshot && snapshot.optionSide === "left" && snapshot.groupIndex === index) ? snapshot : undefined}
                                    hidden={snapshot?.optionSide === "right" || snapshot?.groupIndex !== index}
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
                    hidden={!!(snapshot && snapshot.optionSide === "left")}
                >
                    {
                        taskMeta.rightOption.groupsNames.map((groupName, index) => {
                            return (
                                <Group
                                    key={index}
                                    groupName={groupName}
                                    snapshot={(snapshot && snapshot.optionSide === "right" && snapshot.groupIndex === index) ? snapshot : undefined}
                                    hidden={snapshot?.optionSide === "left" || snapshot?.groupIndex !== index}
                                />
                            )
                        })
                    }
                </Option>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-center">
                {children}
            </div>
        </main>
    )
}