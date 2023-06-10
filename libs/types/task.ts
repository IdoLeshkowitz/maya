import {ObjectId} from "bson";

export interface Task {
    _id?: ObjectId
    taskMetaId: ObjectId
    taskResultId?: ObjectId
}