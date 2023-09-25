import {array, object, string} from "yup";
import {OptionPerformance} from "@/types/performance";

export interface Option {
    name: string
    color: string
    groupsNames: string[]
    performance: OptionPerformance
}

export const optionSchema = object().shape({
    optionName: string().required(),
    optionColor: string().required(),
    groupsNames: array().of(string()).required()
})