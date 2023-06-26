import {shuffle} from "./shuffle";


export function shuffleConfig(config: any) {
    const shuffledOptionsNames = shuffle(config.optionsNames.map((option: String[]) => shuffle(option)))
    const shuffledOptionsColors = shuffle(config.optionsColors.map((option: String[]) => shuffle(option)))
    const shuffledGroupsNames = shuffle(config.groupsNames.map((group: String[]) => shuffle(group)))
    const shuffledPreviews = shuffle(config.previews).map((preview: any) => {
        return {
            ...preview,
            options: shuffle(preview.options)
        }
    })
    return {
        ...config,
        optionsNames : shuffledOptionsNames,
        optionsColors: shuffledOptionsColors,
        groupsNames  : shuffledGroupsNames,
        previews     : shuffledPreviews
    }
}

