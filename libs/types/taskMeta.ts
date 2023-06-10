import {ObjectId} from "bson";
import {Option, optionSchema} from "@/types/option";
import {Preview, previewSchema} from "@/types/preview";
import {number, object, string} from "yup";


export interface TaskMeta {
    _id?: ObjectId
    leftOption: Option
    rightOption: Option
    performance: Preview
    orderInExperiment: number
    belongsToTask ?: ObjectId
}

export const taskMetaSchema = object().shape({
    _id              : object(),
    variantName      : string().required(),
    leftOption       : optionSchema.required(),
    orderInExperiment: number().required(),
    rightOption      : optionSchema.required(),
    performance      : previewSchema.required()
})