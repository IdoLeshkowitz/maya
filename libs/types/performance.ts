export enum SnapshotIndicator {
    CHECK = "check",
    CROSS = "cross",
    LOADING = "loading"
}

export interface Snapshot {
    indicator: string
    groupIndex: number
    label: string
}

export interface Performance {
    overallPerformanceTitle: string
    leftOption: {
        optionPerformanceTitle: string,
        snapshots: Snapshot[]
    },
    rightOption: {
        optionPerformanceTitle: string,
        snapshots: Snapshot[]
    }
}



