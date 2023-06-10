import {ObjectId} from "bson";

export interface TaskResult {
    _id?: ObjectId// task result id
    startTime?: number
    belongsToTask?: ObjectId
    endTime?: number
    optionSelection?: OptionSelection
    leftScores?: number[] | null
    rightScores?: number[] | null
}

export interface OptionSelection {
    selectedSide: 'left' | 'right'
    confidence: number
}