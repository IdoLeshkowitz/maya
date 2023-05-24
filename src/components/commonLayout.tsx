import {FC} from "react";

interface CommonLayoutProps {
    header?: React.ReactNode
    footer?: React.ReactNode
    children: React.ReactNode
}

const CommonLayout: FC<CommonLayoutProps> = ({header, footer, children}) => {
    const layoutGridStyle = {
        display         : 'grid',
        gridTemplateRows: '0.5fr 3fr 1fr',
        gridGap         : '2rem',
    }
    return (
        <main style={layoutGridStyle} className="bg-white h-screen py-8 px-10">
            {header || <div/>}
            {children}
            {footer}
        </main>
    )
}

export default CommonLayout