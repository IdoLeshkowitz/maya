import {FC} from "react";

interface CommonLayoutProps {
    header?: React.ReactNode
    footer?: React.ReactNode
    children: React.ReactNode
}

const CommonLayout: FC<CommonLayoutProps> = ({header, footer, children}) => {
    const layoutGridStyle = {
        display         : 'grid',
        gridTemplateRows: '1fr 3fr 1fr',
        gridGap         : '5rem',
    }
    return (
        <main style={layoutGridStyle} className="py-24 px-32">
            {header || <div/>}
            {children}
            {footer}
        </main>
    )
}

export default CommonLayout