import {Variant} from "@/types/variant";
import {TaskMeta} from "@/types/taskMeta";
import {shuffle} from "./shuffle";
import {splitArray} from "./splitArray";
import {object, array, number, string} from 'yup'


export const randomizeTasksFromVariant = (variant: Variant) => {
    /* check variant properties */
    const numberOfTasks = variant.numberOfTasks
    const output: TaskMeta[] = []
    //shuffle options names
    const shuffledOptionsNames = shuffle(variant.optionsNames)
    //shuffle options colors
    const shuffledOptionsColors = shuffle(variant.optionsColors)
    //shuffle groups names
    const shuffledGroupsNames = shuffle(variant.groupsNames.map(group => shuffle(group)))
    //shuffle performances
    const shuffledPerformances = shuffle(variant.performances)

    //create tasks
    for (let i = 0; i < variant.numberOfTasks; i++) {
        const [leftGroupsNames, rightGroupsNames] = splitArray(shuffledGroupsNames[i])
        const [leftOptionName, rightOptionsName] = shuffledOptionsNames[i]
        const [leftOptionColor, rightOptionsColor] = shuffledOptionsColors[i]
        const taskMeta: TaskMeta = {
            variantName: variant.variantName,
            leftOption : {
                optionName : leftOptionName,
                optionColor: leftOptionColor,
                groupsNames: leftGroupsNames
            },
            rightOption: {
                optionName : rightOptionsName,
                optionColor: rightOptionsColor,
                groupsNames: rightGroupsNames
            },
            performance: shuffledPerformances[i]
        }
        output.push(taskMeta)
    }
    return output
}