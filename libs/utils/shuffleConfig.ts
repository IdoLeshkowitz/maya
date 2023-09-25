import {Config} from "@/types/config";
import {shuffle} from "./shuffle";


export function shuffleConfig(config: Config): Config {
    const shuffledOptionsNames = shuffle(config.optionsNames)
    const shuffledOptionsColors = shuffle(config.optionsColors)
    const shuffledGroupsNames = shuffle(config.groupsNames.map(group => shuffle(group)))
    const shuffledPreviews = shuffle(config.performance.map(preview => {
        return {
            ...preview,
            options: shuffle(preview.options),
        }
    }))
    return {
        ...config,
        optionsNames: shuffledOptionsNames,
        optionsColors: shuffledOptionsColors,
        groupsNames: shuffledGroupsNames,
        performance: shuffledPreviews
    }
}