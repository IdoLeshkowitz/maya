import {ObjectId} from "bson";

export interface TaskResult {
    _id?: ObjectId// task result id
    startTime?: number
    belongsToTask?: ObjectId
    endTime?: number
    selectedOption?: string
    optionSelectionConfidence?: number
    leftScores?: number[] | null
    rightScores?: number[] | null
}

export interface OptionSelection {
    selectedSide: 'left' | 'right'
    confidence: number
}