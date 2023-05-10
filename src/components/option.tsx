import React, {FC, ReactNode} from "react";

interface OptionProps {
    optionName: string
    optionColor: string
    children: ReactNode
    selectable?: boolean
    onClick?: () => void
}

const bgColor: Record<string, string> = {
    'red'   : 'bg-red-500',
    'green' : 'bg-green-500',
    'blue'  : 'bg-blue-500',
    'yellow': 'bg-yellow-500',
}
const Option: FC<OptionProps> = (props) => {
    const {optionName, optionColor, children, selectable, onClick} = props
    const currentBgColor = () => {
        if (Object(bgColor).hasOwnProperty(optionColor)) {
            return bgColor[optionColor]
        }
        return ''
    }
    if (selectable) {
        return (
            <div
                className={`flex flex-col items-center justify-start border-black border-2 h-40 ${currentBgColor()} cursor-pointer hover:bg-opacity-50`}
                onClick={onClick}
            >
                <h2 className="text-2xl font-bold text-black text-center py-2">{optionName}</h2>
                <div className="flex items-start justify-center gap-3">
                    {children}
                </div>
            </div>
        )
    }
    return (
        <div
            className={`flex flex-col items-center justify-start border-black border-2 h-40 ${currentBgColor()}`}>
            <h2 className="text-2xl font-bold text-black text-center py-2">{optionName}</h2>
            <div className="flex items-start justify-center gap-3">
                {children}
            </div>
        </div>
    )
}

export default Option