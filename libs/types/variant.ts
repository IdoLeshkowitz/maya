import {Preview} from "@/types/preview";

export interface Variant {
    variantName: string
    numberOfTasks: number
    optionsColors: string[][]
    optionsNames: string[][]
    groupsNames: string[][]

    previews: Preview[]
}

