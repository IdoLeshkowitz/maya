import {ObjectId} from "bson";

export interface TaskResult {
    taskId: ObjectId
    duration: number
    optionSelection: OptionSelection
    scores: Score[]
}


export interface Score {
    value: number
    confidence: number
}

export interface OptionSelection {
    selectedOptionSide: 'left' | 'right'
    selectedOptionSideConfidence: number
}