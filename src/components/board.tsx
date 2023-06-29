import '../app/globals.css'
import {Prisma} from "@prisma/client";
import React, {FC, ReactNode} from "react";
import experimentConfig from "@public/experimentConfig.json"

const snapshotSelect: Prisma.SnapshotSelect = {
    groupIndex: true,
    label     : true,
    indicator : true,
}
type SnapshotPayload = Prisma.SnapshotGetPayload<{ select: typeof snapshotSelect }>

export interface BoardProps {
    footer?: ReactNode
    header?: ReactNode
    leftOptionName: string
    rightOptionName: string
    leftOptionColor: string
    rightOptionColor: string
    leftOptionGroupsNames: string[]
    rightOptionGroupsNames: string[]
    currentSnapshot?: SnapshotPayload
}

interface ItemProps {
    indicator?: string
    groupName: string
    focused?: boolean
    hidden?: boolean
}

interface PortfolioProps {
    optionName?: string
    optionColor?: string
    children: ReactNode
    onClick?: () => void
    tabIndex?: number
}

export const Board: FC<BoardProps> = (props) => {
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
                {props.header ?? <div/>}
            </div>
            {/*options*/}
            <div style={optionsContainerStyle}>
                {/*left option*/}
                <Portfolio
                    optionColor={props.leftOptionColor}
                    optionName={props.leftOptionName}
                    tabIndex={1}
                >
                    {/*left option groups*/}
                    {
                        props.leftOptionGroupsNames.map((groupName, i) => {
                            const isCurrentSnapshot = !!props.currentSnapshot && props.currentSnapshot.groupIndex === i && !!props.currentSnapshot.appearsAsLeftAtTaskId
                            return (
                                <Item
                                    key={i}
                                    groupName={groupName}
                                    /* hidden if there is a current snapshot and it is not related to the current group */
                                    hidden={!!props.currentSnapshot && !isCurrentSnapshot}
                                    /* focused if there is a current snapshot and it is related to the current group */
                                    focused={isCurrentSnapshot}
                                    indicator={props.currentSnapshot?.indicator ?? undefined}
                                />
                            )
                        })
                    }
                </Portfolio>
                {/*right option*/}
                <Portfolio
                    optionColor={props.rightOptionColor}
                    optionName={props.rightOptionName}
                    tabIndex={2}
                >
                    {/*right option groups*/}
                    {
                        props.rightOptionGroupsNames.map((groupName, i) => {
                            const isCurrentSnapshot = !!props.currentSnapshot && props.currentSnapshot.groupIndex === i && !props.currentSnapshot.appearsAsLeftAtTaskId
                            return (
                                <Item
                                    key={i}
                                    groupName={groupName}
                                    /* hidden if there is a current snapshot and it is not related to the current group */
                                    hidden={!!props.currentSnapshot && !isCurrentSnapshot}
                                    /* focused if there is a current snapshot and it is related to the current group */
                                    focused={isCurrentSnapshot}
                                    indicator={props.currentSnapshot?.indicator ?? undefined}
                                />
                            )
                        })
                    }
                </Portfolio>
            </div>
            {/*footer*/}
            {props.footer}
        </main>
    )
}
const Item: FC<ItemProps> = (props) => {
    const focusedClassName = props.focused ? 'border-4 border-black bg-white' : 'border'
    if (props.hidden) return (
        <div className="flex text-black items-center relative justify-center aspect-square">
        </div>
    )
    return (
        <>
            <div
                className={`flex text-black items-center relative justify-center aspect-square bg-white ${focusedClassName}`}>
                <span className="text-md lg:text-xl xl:text-2xl" style={{whiteSpace: "nowrap"}}>{props.groupName}</span>
                {
                    props.indicator &&
                    <div className="absolute -bottom-32">
                        <Snapshot indicator={props.indicator}/>
                    </div>
                }
            </div>
        </>
    )
}

const Snapshot = ({indicator: indicator}: { indicator: string }) => {
    if (indicator === "cross") {
        return (
            <svg xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 strokeWidth="3"
                 stroke="currentColor"
                 className="w-20 h-20 text-red-500 ms-2 lg:scale-125 xl:scale-150"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        )
    }
    if (indicator === "loading") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                strokeWidth="3"
                stroke="currentColor"
                className="w-20 h-14 ms-2 lg:scale-125 xl:scale-150"
            >
                <circle cx="2" cy="10" r="2" className="animate-bounce" style={{animation: 'bounce 1s infinite'}}/>
                <circle cx="10" cy="10" r="2" className="animate-bounce"
                        style={{animation: 'bounce 1s infinite', animationDelay: '50ms'}}/>
                <circle cx="18" cy="10" r="2" className="animate-bounce"
                        style={{animation: 'bounce 1s infinite', animationDelay: '100ms'}}/>
            </svg>
        )
    }
    if (indicator === "check") {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
                stroke="currentColor"
                className="w-20 h-20 text-green-600 ms-2 lg:scale-125 xl:scale-150"
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
            </svg>
        )
    }
    return null
}

const Portfolio: FC<PortfolioProps> = (props) => {
    const {optionName, optionColor, children, onClick, tabIndex} = props
    let bgColor;
    switch (optionColor) {
        case 'red':
            bgColor = experimentConfig.colors.red
            break;
        case 'green':
            bgColor = experimentConfig.colors.green
            break;
        case 'blue':
            bgColor = experimentConfig.colors.blue
            break;
        case 'yellow':
            bgColor = experimentConfig.colors.yellow
            break;
        default:
            bgColor = experimentConfig.colors.white
    }
    return (
        <div className="flex flex-col justify-center">
            <div
                className={`flex flex-col items-center justify-center border-black border ${onClick ? "cursor-pointer" : ""}`}
                style={{backgroundColor: bgColor}}
                onClick={onClick}
                tabIndex={tabIndex}
                onKeyDown={onClick && ((e) => {
                    if (e.key === "Enter") {
                        onClick()
                    }
                })}
            >
                <h2 className="text-base font-bold text-black text-center py-2 justify-self-center mt-8">{optionName}</h2>
                <div
                    style={{
                        display            : "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                    }}
                    className="self-stretch mx-3 my-8 flex justify-between gap-2"
                >
                    {children}
                </div>
            </div>
        </div>
    )
}


