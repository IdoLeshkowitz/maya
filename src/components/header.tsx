import {FC, ReactNode} from "react";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    centered?: boolean
    children?: ReactNode
}

const Header: FC<HeaderProps> = ({centered,children,...props}) => {
    return (
        <p className={`text-black text-base ${centered ? 'text-center' : 'text-instructions'}`} {...props}>
            {children}
        </p>
    )
}
export default Header