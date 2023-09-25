import {FC, ReactNode} from "react";
import Link, {LinkProps} from "next/link";

interface ButtonProps {
    children: ReactNode
    onClick: () => void
    disabled?: boolean
}

interface ButtonLinkProps extends LinkProps{
    children: ReactNode
    href: string
    disabled?: boolean
}

export const CommonButton: FC<ButtonProps> = (props) => {
    const {children, onClick, disabled} = props
    const hoverClass = disabled ? '' : 'hover:bg-opacity-10 hover:text-blue-500 hover:scale-110'
    const focusClass = disabled ? '' : 'focus:bg-opacity-10 focus:text-blue-500 focus:scale-110'
    const bgClass = disabled ? 'bg-none' : 'bg-blue-500 bg-opacity-90'
    const textClass = disabled ? 'text-black' : 'text-white'
    const cursorClass = disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    const scaleClass = disabled ? '' : 'scale-105'
    return (<button
            type="button"
            disabled={!!disabled}
            onClick={onClick}
            data-testid="common-button"
            className={`font-bold py-3 px-5 rounded-full border border-blue transition ease-in-out delay-75 duration-200 ${cursorClass} ${hoverClass} ${focusClass} ${bgClass} ${textClass} ${scaleClass}`}
        >
            {children}
        </button>)

}
export const CommonButtonLink: FC<ButtonLinkProps> = (props) => {
    const {children, href, disabled} = props
    const hoverClass = disabled ? '' : 'hover:bg-opacity-10 hover:text-blue-500 hover:scale-110'
    const focusClass = disabled ? '' : 'focus:bg-opacity-10 focus:text-blue-500 focus:scale-110'
    const bgClass = disabled ? 'bg-none' : 'bg-blue-500 bg-opacity-90'
    const textClass = disabled ? 'text-black' : 'text-white'
    const cursorClass = disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    const scaleClass = disabled ? '' : 'scale-105'
    const pointerEventsClass = disabled ? 'pointer-events-none' : 'pointer-events-auto'
    return (<Link
            {...props}
            aria-disabled={!!disabled}
            className={`font-bold py-3 px-5 rounded-full border border-blue transition ease-in-out delay-75 duration-200 ${cursorClass} ${hoverClass} ${focusClass} ${bgClass} ${textClass} ${scaleClass} ${pointerEventsClass}`}
            href={href}
        >
            {children}
        </Link>)

}