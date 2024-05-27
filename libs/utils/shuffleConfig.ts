import {Config} from "@/types/config";
import {shuffle} from "./shuffle";


export function shuffleConfig(config: Config): Config {
    const shuffledOptionsNames = shuffle(config.optionsNames.map(name => shuffle(name)))
    const shuffledOptionsColors = shuffle(config.optionsColors.map(color => shuffle(color)))
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

export function getRandomConfigFromConfigsList(configs: Config[]): Config {
    return configs[Math.floor(Math.random() * configs.length)]
}

export function pickRandomConfigAndShuffle(configs: Config[]): Config {
    return shuffleConfig(getRandomConfigFromConfigsList(configs))
}