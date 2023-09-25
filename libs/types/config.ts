import {Performance, previewSchema} from "@/types/performance";
import {array, number, object, string} from "yup";

export const configSchema = object().shape({
    colors       : object().required(),
    variantName  : string().required(),
    numberOfTasks: number().required(),
    optionsColors: array(array(string())).required(),
    optionsNames : array(array(string())).required(),
    groupsNames  : array(array(string())).required(),
    previews : array().of(previewSchema).required(),
})

export interface Config {
    variantName: string
    experimentName: string
    experimentVersion : string
    numberOfTasks: number
    optionsColors: string[][]
    optionsNames: string[][]
    groupsNames: string[][]

    previews: Performance[]
}

