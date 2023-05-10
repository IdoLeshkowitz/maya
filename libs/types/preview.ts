interface Snapshot {
    groupIndex: number
    indicator: 'cross' | 'check'
}

export interface Preview {
    name: string
    snapshots: Snapshot[]
}

export interface Previews {
    "left": Preview[]
    "right": Preview[]
}