'use client'
import {FC, ReactNode} from "react";
import {CSVLink} from "react-csv";

interface CsvLinkProps {
    children : ReactNode
    data :any
}
const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
];
export const CsvLink : FC<CsvLinkProps> = (props) => {
    return <CSVLink data={props.data} className="bg-blue-500 rounded-md text-white px-5 py-2">{props.children}</CSVLink>
}
