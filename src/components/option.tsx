import React, {FC, ReactNode} from "react";
import {clsx} from "clsx";

interface OptionProps {
    optionName: string
    color: string
    children: ReactNode
    onClick?: () => void
    hidden?: boolean
    tabIndex?: number
}


const Option: FC<OptionProps> = (props) => {
    const {optionName, color, children, onClick, hidden, tabIndex} = props
    if (hidden === true) {
        return (
            <div className={`flex flex-col basis-1/3 items-center justify-evenly`}/>
        )
    }
    const colors: Record<string, string> = {
        "green": "bg-[#005F2C]",
        "blue": "bg-[#000080]",
        "orange": "bg-[#FF6600]",
        "brown": "bg-[#43141A]",
        "red": "bg-[#E0245E]",
        "yellow": "bg-[#FFD700]",
        "lightblue": "bg-[#99d9ea]",
        "gray": "bg-[#c3c3c3]",
        "purple": "bg-[#440055]"
    }

    return (
        <div className="flex flex-col justify-center">
            <div
                className={clsx("flex flex-col items-center justify-center border-black border", onClick && "cursor-pointer", colors[color])}

                onClick={onClick}
                tabIndex={tabIndex}
                onKeyDown={onClick && ((e) => {
                    if (e.key === "Enter") {
                        onClick()
                    }
                })}
            >
                <h2 className="text-base font-bold text-black text-center py-2 justify-self-center mt-8 bg-white">{optionName}</h2>
                <GroupsContainer>
                    {children}
                </GroupsContainer>
            </div>
        </div>
    )
}


const GroupsContainer = ({children}: { children: ReactNode }) => {
    const gridContainerStyle = {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
    }
    return (
        <div
            style={gridContainerStyle}
            className="self-stretch mx-3 my-8 flex justify-between gap-2"
        >
            {children}
        </div>
    )
}
export default Option