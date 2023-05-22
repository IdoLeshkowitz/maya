import {FC, ReactNode} from "react";

interface HeaderProps {
    centered?: boolean
    children?: ReactNode
}

const Header: FC<HeaderProps> = (props) => {
    const {centered, children} = props
    return (
        <p className={`text-black text-base ${centered ? 'text-center' : 'text-start'}`}>
            {children}
        </p>
    )
}
export default Header