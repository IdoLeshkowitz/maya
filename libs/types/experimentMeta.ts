import {ObjectId} from "bson";

export interface ExperimentMetadata {
    _id?: ObjectId
    tasksIds: ObjectId[]
}