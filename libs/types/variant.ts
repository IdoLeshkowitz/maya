import {Performance} from "@/types/performance";

export interface Variant {
    variantName: string
    numberOfTasks: number
    optionsColors: string[][]
    optionsNames: string[][]
    groupsNames: string[][]

    performances: Performance[]
}

