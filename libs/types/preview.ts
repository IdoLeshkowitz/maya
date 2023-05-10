export enum SnapshotIndicator {
    CHECK = "check",
    CROSS = "cross",
    LOADING = "loading"
}

export interface Snapshot {
    groupIndex: number
    indicator: SnapshotIndicator
    label: string
}

export interface Preview {
    rightSnapshotsName: string
    leftSnapshotsName: string
    rightSnapshots: Snapshot[]
    leftSnapshots: Snapshot[]
}
