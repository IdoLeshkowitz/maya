import {GroupCollection} from "@/types/GroupCollection";
import {Preview} from "@/types/Preview";

export interface TasksByVariant {
    name: string
    numberOfTasks: number
    optionsColors: string[][]
    optionsNames: string[][]
    groupsCollections: GroupCollection[]
    previews: Preview[]
}

