import {Config} from "@/types/config";
import {TaskMeta} from "@/types/taskMeta";
import {shuffle} from "./shuffle";
import {splitArray} from "./splitArray";


export function shuffleConfig(config: Config): Config {
    const shuffledOptionsNames = shuffle(config.optionsNames)
    const shuffledOptionsColors = shuffle(config.optionsColors)
    const shuffledGroupsNames = shuffle(config.groupsNames.map(group => shuffle(group)))
    const shuffledPreviews = shuffle(config.previews)
    return {
        ...config,
        optionsNames : shuffledOptionsNames,
        optionsColors: shuffledOptionsColors,
        groupsNames  : shuffledGroupsNames,
        previews     : shuffledPreviews
    }
}

export function createTaskMetasFromConfig(config: Config): TaskMeta[] {
    const output: TaskMeta[] = []
    for (let i = 0; i < config.numberOfTasks; i++) {
        const [leftGroupsNames, rightGroupsNames] = splitArray(config.groupsNames[i])
        const [leftOptionName, rightOptionsName] = config.optionsNames[i]
        const [leftOptionColor, rightOptionsColor] = config.optionsColors[i]
        const taskMeta: TaskMeta = {
            orderInExperiment: i + 1,
            leftOption       : {
                optionName : leftOptionName,
                optionColor: leftOptionColor,
                groupsNames: leftGroupsNames
            },
            rightOption      : {
                optionName : rightOptionsName,
                optionColor: rightOptionsColor,
                groupsNames: rightGroupsNames
            },
            performance      : config.previews[i]
        }
        output.push(taskMeta)
    }
    return output
}
