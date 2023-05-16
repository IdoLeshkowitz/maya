import {ObjectId} from "bson";

export interface TaskResult {
    _id?: ObjectId// task result id
    taskId: ObjectId
    duration?: number | null
    optionSelection?: OptionSelection | null
    leftScores?: number[] | null
    rightScores?: number[] | null
}

export interface OptionSelection {
    selectedSide: 'left' | 'right'
    confidence: number
}