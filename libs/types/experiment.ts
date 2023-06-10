import {ObjectId} from "bson";
import {Config} from "@/types/config";

export interface Experiment{
    _id?: ObjectId
    experimentMetaId?: ObjectId
    personalDetailsId?: ObjectId
}