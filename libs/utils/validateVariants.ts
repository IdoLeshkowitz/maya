import {Variant, variantSchema} from "@/types/variant";


export async function validateVariant(variant: unknown) {
    /* check against the variant schema */
    await variantSchema.validate(variant)
    const validVariant = <Variant>variant

    const numberOfTasks = validVariant.numberOfTasks
    /* check that the number of option colors is equal to the number of tasks */
    if (validVariant.optionsColors.length !== numberOfTasks) {
        return Promise.reject(`Invalid variant: ${JSON.stringify((variant))} \n The number of option colors is not equal to the number of tasks`)
    }
    /* check that the number of option names is equal to the number of tasks */
    if (validVariant.optionsNames.length !== numberOfTasks) {
        return Promise.reject(`Invalid variant: ${JSON.stringify((variant))} \n The number of option names is not equal to the number of tasks`)
    }
    /* check that the number of groups names is equal to the number of tasks */
    if (validVariant.groupsNames.length !== numberOfTasks) {
        return Promise.reject(`Invalid variant: ${JSON.stringify((variant))} \n The number of groups names is not equal to the number of tasks`)
    }
    /* check that the number of performances is equal to the number of tasks */
    if (validVariant.performances.length !== numberOfTasks) {
        return Promise.reject(`Invalid variant: ${JSON.stringify((variant))} \n The number of performances is not equal to the number of tasks`)
    }
    return true
    //todo : check number of items in each array
}
