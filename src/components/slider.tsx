import {FC, useCallback, useState} from "react";

interface SliderProps {
    onChange?: (value: number) => void
    min?: number
    max?: number
    value: number | null
    [key: string]: any
}

const Slider: FC<SliderProps> = (props) => {
    const {onChange, value,max,min} = props

    function onChangeCallback(value: number) {
        onChange?.(value)
    }

    return (
        <div className="flex flex-col justify-center gap-5 self-stretch text-center mb-3">
            <div className="flex justify-center basis-1/2">
                <input
                    {...props}
                    type="range"
                    min={min ?? 0}
                    max={max ?? 100}
                    className="w-full basis-1/2"
                    value={value ?? 0}
                    onChange={(event) => {
                        onChangeCallback(event.target.valueAsNumber)
                    }}
                />
            </div>
            <p className={`text-2xl font-bold text-black ${value === undefined && 'opacity-0'}`}>
                {value ?? <span>&nbsp;</span>}
            </p>
        </div>
    )
}
export default Slider