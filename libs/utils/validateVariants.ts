import {array, number, object, string} from "yup";
import {an} from "vitest/dist/types-b7007192";
import {Variant} from "@/types/variant";

const variantSchema = object().shape({
    variantName  : string().required(),
    numberOfTasks: number().required(),
    optionsColors: array(array(string())).required(),
    optionsNames : array(array(string())).required(),
    groupsNames  : array(array(string())).required(),
    performances : array(object().shape({
        overallPerformanceTitle: string().required(),
        leftOption             : object().shape({
            optionPerformanceTitle: string().required(),
            snapshots             : array(object().shape({
                indicator : string().required(),
                groupIndex: number().required(),
                label     : string().required()
            })).required()
        }).required(),
        rightOption            : object().shape({
            optionPerformanceTitle: string().required(),
            snapshots             : array(object().shape({
                indicator : string().required(),
                groupIndex: number().required(),
                label     : string().required()
            })).required()
        }).required()
    })).required()
})

export function validateVariant(variant: unknown)  {
    /* check against the variant schema */
    try {
        variantSchema.validateSync(variant)
    } catch (e: any) {
        throw new Error(`Invalid variant: ${JSON.stringify((variant))} \n ${e.toString()}`)
    }
    const validVariant = <Variant>variant

    const numberOfTasks = validVariant.numberOfTasks
    /* check that the number of option colors is equal to the number of tasks */
    if (validVariant.optionsColors.length !== numberOfTasks) {
        throw new Error(`Invalid variant: ${JSON.stringify((variant))} \n The number of option colors is not equal to the number of tasks`)
    }
    /* check that the number of option names is equal to the number of tasks */
    if (validVariant.optionsNames.length !== numberOfTasks) {
        throw new Error(`Invalid variant: ${JSON.stringify((variant))} \n The number of option names is not equal to the number of tasks`)
    }
    /* check that the number of groups names is equal to the number of tasks */
    if (validVariant.groupsNames.length !== numberOfTasks) {
        throw new Error(`Invalid variant: ${JSON.stringify((variant))} \n The number of groups names is not equal to the number of tasks`)
    }
    /* check that the number of performances is equal to the number of tasks */
    if (validVariant.performances.length !== numberOfTasks) {
        throw new Error(`Invalid variant: ${JSON.stringify((variant))} \n The number of performances is not equal to the number of tasks`)
    }
    //todo : check number of items in each array
}
