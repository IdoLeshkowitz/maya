"use client"
import {Snapshot} from "@/types/performance";
import React, {ReactNode, useMemo} from "react";
import '../app/globals.css'
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {TaskReturnType} from "@/app/api/task/[id]/route";
import {Option as OptionType} from "@/types/option";
import Option from "@/components/option";
import Group from "@components/group";

interface BoardProps {
    taskId: string
    snapshot?: Snapshot & { optionSide: 'LEFT' | 'RIGHT' }
    children?: ReactNode
    header?: ReactNode
    onOptionSelected?: (side: 'LEFT' | 'RIGHT') => void
}

export default function Board(props: BoardProps) {
    const {children, snapshot, header, onOptionSelected} = props
    const queryClient = useQueryClient()
    const {data} = useQuery<TaskReturnType>(['task', props.taskId], () => fetch(`/api/task/${props.taskId}`).then(res => res.json()), {
        suspense: true,
    })

    const optionsContainerStyle = {
        display: 'grid',
        gridTemplateColumns: "repeat(2,1fr)",
        gridGap: "1rem",
    }
    const boardContainerStyle = {
        display: 'grid',
        gridTemplateRows: ".5fr 3fr 1fr",
        gridGap: "1rem",
    }
    const leftOption = useMemo(() => {
        if (!data) {
            return null
        }
        const leftOption = data.leftOption as any
        return {...leftOption, performance: JSON.parse(leftOption["performance"])} as OptionType
    }, [data])
    const rightOption = useMemo(() => {
        if (!data) {
            return null
        }
        const rightOption = data.rightOption as any
        return {...rightOption, performance: JSON.parse(rightOption["performance"])} as OptionType
    }, [data])

    return (
        <main className="py-8 px-10 bg-white h-screen" style={boardContainerStyle}>
            {/* header */}
            <div className="px-20 flex justify-center items-center">
                {header ?? <div/>}
            </div>
            {/*options*/}
            <div style={optionsContainerStyle}>
                {/*left option*/}
                <Option
                    tabIndex={0}
                    optionName={leftOption?.name ?? ""}
                    color={leftOption?.color ?? ""}
                    onClick={() => onOptionSelected && onOptionSelected('LEFT')}
                >
                    {
                        leftOption?.groupsNames.map((groupName, index) => {
                            return (
                                <Group
                                    key={index}
                                    groupName={groupName}
                                    snapshot={(snapshot && snapshot.optionSide === "LEFT" && snapshot.groupIndex === index) ? snapshot : undefined}
                                    hidden={snapshot && (snapshot?.optionSide === "RIGHT" || snapshot?.groupIndex !== index)}
                                />
                            )
                        })
                    }
                </Option>
                {/*right option*/}
                <Option
                    tabIndex={1}
                    optionName={rightOption?.name ?? ""}
                    color={rightOption?.color ?? ""}
                    onClick={() => onOptionSelected && onOptionSelected('RIGHT')}
                >
                    {
                        rightOption?.groupsNames.map((groupName, index) => {
                            return (
                                <Group
                                    key={index}
                                    groupName={groupName}
                                    snapshot={(snapshot && snapshot.optionSide === "RIGHT" && snapshot.groupIndex === index) ? snapshot : undefined}
                                    hidden={snapshot && (snapshot?.optionSide === "LEFT" || snapshot?.groupIndex !== index)}
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