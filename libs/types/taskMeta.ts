import {ObjectId} from "bson";
import {Option, optionSchema} from "@/types/option";
import {Performance, previewSchema} from "@/types/performance";
import {number, object, string} from "yup";


export interface TaskMeta {
    id?: ObjectId
    leftOption: Option
    rightOption: Option
    performance: Performance
    orderInExperiment: number
}

export const taskMetaSchema = object().shape({
    _id              : object(),
    variantName      : string().required(),
    leftOption       : optionSchema.required(),
    orderInExperiment: number().required(),
    rightOption      : optionSchema.required(),
    performance      : previewSchema.required()
})