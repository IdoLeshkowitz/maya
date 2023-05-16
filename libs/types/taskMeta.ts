import {ObjectId} from "bson";
import {Option} from "@/types/option";
import {Performance} from "@/types/performance";


export interface TaskMeta {
    _id?: ObjectId
    variantName: string
    leftOption: Option
    rightOption: Option
    performance: Performance
}
