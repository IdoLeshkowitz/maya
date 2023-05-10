import React, {FC, ReactNode} from "react";

interface OptionProps {
    optionName: string
    optionColor: string
    children: ReactNode
    selectable?: boolean
}

const Option: FC<OptionProps> = ({optionColor, selectable, children, optionName}) => {
    return (
        <div className={`flex flex-col items-center justify-start border-black border-2 h-40 bg-${optionColor}-500`} >
            <h2 className="text-2xl font-bold text-black text-center py-2">{optionName}</h2>
            <div className="flex items-start justify-center gap-3">
                {children}
            </div>
        </div>
    )
}

export default Option