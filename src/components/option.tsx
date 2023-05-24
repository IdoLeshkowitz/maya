import React, {FC, ReactNode} from "react";
import experimentConfig from "@public/experimentConfig.json"

interface OptionProps {
    optionName: string
    optionColor: string
    children: ReactNode
    onClick?: () => void
    hidden?: boolean
    tabIndex?: number
}


const Option: FC<OptionProps> = (props) => {
    const {optionName, optionColor, children, onClick, hidden, tabIndex} = props
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
    if (hidden === true) {
        return (
            <div className={`flex flex-col basis-1/3 items-center justify-evenly`}/>
        )
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
                <GroupsContainer>
                    {children}
                </GroupsContainer>
            </div>
        </div>
    )
}


const GroupsContainer = ({children}: { children: ReactNode }) => {
    const gridContainerStyle = {
        display            : "grid",
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