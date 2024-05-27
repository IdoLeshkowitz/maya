import QueryProvider from "@/app/task/queryProvider";
import {Suspense} from "react";

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
    return (
        <QueryProvider>
            {children}
        </QueryProvider>
    )
}

