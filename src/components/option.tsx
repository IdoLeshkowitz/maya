import React, {FC, ReactNode} from "react";

interface OptionProps {
    optionName: string
    optionColor: string
    children: ReactNode
    selectable?: boolean
    onClick?: () => void
    hidden?: boolean
    tabIndex?: number
}


const Option: FC<OptionProps> = (props) => {
    const {optionName, optionColor, children, selectable, onClick, hidden, tabIndex} = props
    const bgClass = `bg-${optionColor}`
    if (selectable) {
        return (
            <div
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onClick && onClick()
                    }
                }}
                tabIndex={tabIndex}
                className={`flex flex-col basis-1/3 items-center justify-evenly border-black border-2 cursor-pointer hover:bg-opacity-50 focus:bg-opacity-50 ${bgClass}`}
                onClick={onClick}
            >
                <h2 className="text-2xl font-bold text-black text-center py-2">{optionName}</h2>
                <div className="flex justify-center gap-4 basis-1/2 self-stretch px-6">
                    {children}
                </div>
            </div>
        )
    }
    if (hidden === true) {
        return (
            <div className={`flex flex-col basis-1/3 items-center justify-evenly`}/>
        )
    }
    return (
        <div
            className={`flex flex-col basis-1/3 items-center justify-evenly border-black border-2 ${bgClass}`}>
            <h2 className="text-2xl font-bold text-black text-center py-2">{optionName}</h2>
            <div className="flex justify-center gap-4 basis-1/2 self-stretch px-6">
                {children}
            </div>
        </div>
    )
}

export default Option