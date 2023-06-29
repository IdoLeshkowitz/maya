import {FC, ReactNode} from "react";
import Link from "next/link";

interface ButtonProps {
    children: ReactNode
    onClick?: () => any
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
}

export const CommonButton: FC<ButtonProps> = (props) => {
    const {children, onClick, disabled,type} = props
    const hoverClass = disabled ? '' : 'hover:bg-opacity-10 hover:text-blue-500 hover:scale-110'
    const focusClass = disabled ? '' : 'focus:bg-opacity-10 focus:text-blue-500 focus:scale-110'
    const bgClass = disabled ? 'bg-none' : 'bg-blue-500 bg-opacity-90'
    const textClass = disabled ? 'text-black' : 'text-white'
    const cursorClass = disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    const scaleClass = disabled ? '' : 'scale-105'
    return (
        <button
            disabled={!!disabled}
            onClick={onClick}
            type={type || 'button'}
            data-testid="common-button"
            className={`font-bold py-3 px-5 rounded-full border border-blue transition ease-in-out delay-75 duration-200 ${cursorClass} ${hoverClass} ${focusClass} ${bgClass} ${textClass} ${scaleClass}`}
        >
            {children}
        </button>
    )

}

interface LinkProps {
    children: ReactNode
    href: string
}

export const CommonLink: FC<LinkProps> = (props) => {
    const {children, href} = props
    return (
        <Link
            href={href}
            data-testid="common-link"
            className="font-bold py-3 px-5 rounded-full border border-blue transition ease-in-out delay-75 duration-200 hover:bg-opacity-10 hover:text-blue-500 hover:scale-110 focus:bg-opacity-10 focus:text-blue-500 focus:scale-110 bg-blue-500 bg-opacity-90 text-white scale-105"
        >
            {children}
        </Link>
    )
}