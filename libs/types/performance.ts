import {array, number, object, string} from "yup";

export enum SnapshotIndicator {
    CHECK = "check",
    CROSS = "cross",
    LOADING = "loading",
    NONE = "none"
}

export interface Snapshot {
    indicator: string
    groupIndex: number
    label?: string
    optionSide: string
}

export const snapshotSchema = object().shape({
    indicator : string().required(),
    groupIndex: number().required(),
    label     : string().required(),
    optionSide: string().required()
})

export interface Performance {
    overallPerformanceTitle: string
    leftPerformanceTitle: string
    rightPerformanceTitle: string
    snapshots: Snapshot[]
}

export const performanceSchema = object().shape({
    overallPerformanceTitle: string().required(),
    leftPerformanceTitle   : string().required(),
    rightPerformanceTitle  : string(),
    snapshots              : array().of(snapshotSchema).required()
})



