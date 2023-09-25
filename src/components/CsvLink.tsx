'use client'
import {FC, ReactNode} from "react";
import {CSVLink} from "react-csv";

interface CsvLinkProps {
    children: ReactNode
    data: any
    fileName: string
    headers ?: any[]
}

export const CsvLink: FC<CsvLinkProps> = (props) => {
    return <CSVLink filename={props.fileName} data={props.data} headers={props.headers} target={"_blank"} href={"#"}
                    className="bg-blue-500 rounded-md text-white px-5 py-2">{props.children}</CSVLink>
}
