import {ObjectId} from "bson";
import {Option, optionSchema} from "@/types/option";
import {Performance, performanceSchema} from "@/types/performance";
import {object, string} from "yup";


export interface TaskMeta {
    _id?: ObjectId
    variantName: string
    leftOption: Option
    rightOption: Option
    performance: Performance
}

export const taskMetaSchema = object().shape({
    _id        : object(),
    variantName: string().required(),
    leftOption : optionSchema.required(),
    rightOption: optionSchema.required(),
    performance: performanceSchema.required()
})