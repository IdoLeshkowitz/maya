import {ObjectId} from "bson";
import {Option} from "@/types/option";
import {Preview} from "@/types/preview";


export interface TaskMetadata {
    _id?: ObjectId
    variantName: string
    leftOption: Option
    rightOption: Option
    preview: Preview
}
