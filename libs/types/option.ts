import {object, string} from "yup";

export interface Option {
    optionName: string
    optionColor: string
    groupsNames: string[]
}

export const optionSchema = object().shape({
    optionName: string().required(),
})