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
        <div
            className={`flex flex-col grow-0 items-center justify-between border-black border-2 ${onClick ? "cursor-pointer" : ""}`}
            style={{backgroundColor: bgColor}}
            onClick={onClick}
            tabIndex={tabIndex}
            onKeyDown={onClick && ((e) => {
                if (e.key === "Enter") {
                    onClick()
                }
            })}
        >
            <h2 className="text-2xl font-bold text-black text-center py-2 justify-self-center mt-8">{optionName}</h2>
            <GroupsContainer>
                {children}
            </GroupsContainer>
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
            className="self-stretch gap-5 mx-3 my-8"
        >
            {children}
        </div>
    )
}
export default Option