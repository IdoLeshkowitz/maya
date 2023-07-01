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
}

export interface option {
    groupName: string
    simpleName: string
    snapshots: Snapshot[]
}

export const snapshotSchema = object().shape({
    indicator : string().required(),
    groupIndex: number().required(),
    label     : string().required(),
    optionSide: string().required()
})

export interface Preview {
    overallPreviewName: string
    options: option[]
}

export const previewSchema = object().shape({
    previewName           : string().required(),
    leftPreviewGroupName  : string().required(),
    rightPreviewGroupName : string().required(),
    leftPreviewSimpleName : string().required(),
    rightPreviewSimpleName: string().required(),
    snapshots             : array().of(snapshotSchema).required()
})



