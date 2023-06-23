import {ObjectId} from "bson";
import {Config} from "@/types/config";

export interface ExperimentMeta {
    _id?: ObjectId
    tasksIds?: ObjectId[]
    config : Config
    prolificId?: string
    belongsToExperimentId?: ObjectId
}
