import {ObjectId} from "bson";

export interface ExperimentMeta {
    _id?: ObjectId
    tasksIds: ObjectId[]
}