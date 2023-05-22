import {FC, useCallback, useState} from "react";

interface SliderProps {
    onChange?: (value: number) => void
    value?: number
}

const Slider: FC<SliderProps> = (props) => {
    const {onChange, value} = props

    function onChangeCallback(value: number) {
        onChange?.(value)
    }

    return (
        <div className="flex flex-col justify-center gap-5 self-stretch text-center mb-3">
            <div className="flex justify-center basis-1/2">
                <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full basis-1/2"
                    value={value ?? 0}
                    onChange={(event) => {
                        onChangeCallback(event.target.valueAsNumber)
                    }}
                />
            </div>
            <p className={`text-2xl font-bold text-black ${value === undefined && 'opacity-0'}`}>
                {value ?? 'no value'}
            </p>
        </div>
    )
}
export default Slider