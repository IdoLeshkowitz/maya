import {ObjectId} from "bson";

export interface TaskResult {
    _id?: ObjectId
    taskId: ObjectId
    duration: number
    optionSelection: OptionSelection
    leftScores: Score[]
    rightScores: Score[]
}

export interface Score {
    value: number
    confidence: number
}

export interface OptionSelection {
    selectedSide: 'left' | 'right'
    confidence: number
}