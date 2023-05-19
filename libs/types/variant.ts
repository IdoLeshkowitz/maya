import {Performance, performanceSchema} from "@/types/performance";
import {array, number, object, string} from "yup";

export const variantSchema = object().shape({
    variantName  : string().required(),
    numberOfTasks: number().required(),
    optionsColors: array(array(string())).required(),
    optionsNames : array(array(string())).required(),
    groupsNames  : array(array(string())).required(),
    performances : array().of(performanceSchema).required()
})

export interface Variant {
    variantName: string
    numberOfTasks: number
    optionsColors: string[][]
    optionsNames: string[][]
    groupsNames: string[][]

    performances: Performance[]
}

