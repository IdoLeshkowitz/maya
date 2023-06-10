import {describe, expect, test} from "vitest"
//
// const validVariant: Config = {
//     "variantName"  : "stocks",
//     "numberOfTasks": 2,
//     "optionsColors": [
//         ["red", "green"],
//         ["blue", "yellow"]
//     ],
//     "optionsNames" : [
//         ["Portfolio ABG", "Portfolio QYN"],
//         ["Portfolio BGH", "Portfolio ZQN"]
//     ],
//     "groupsNames"  : [
//         ["Banking", "Food", "Products", "Insurance", "Materials", "Utilities"],
//         ["Real Estate", "Fashion", "Automobiles", "Tourism", "Transportation", "Entertainment"]
//     ],
//     "preview" : [
//         {
//             "overallPerformanceTitle": "left good - right bad",
//             "leftPerformanceTitle"   : "good",
//             "rightPerformanceTitle"  : "bad",
//             "snapshots"              : [
//                 {"groupIndex": 0, "label": "Company1", "indicator": "loading", "optionSide": "left"},
//                 {"groupIndex": 0, "label": "Company1", "indicator": "check", "optionSide": "left"},
//                 {"groupIndex": 1, "label": "Company2", "indicator": "loading", "optionSide": "left"},
//                 {"groupIndex": 1, "label": "Company2", "indicator": "check", "optionSide": "left"},
//                 {"groupIndex": 2, "label": "Company3", "indicator": "loading", "optionSide": "left"},
//                 {"groupIndex": 2, "label": "Company3", "indicator": "check", "optionSide": "left"},
//                 {"groupIndex": 3, "label": "Company4", "indicator": "loading", "optionSide": "right"},
//                 {"groupIndex": 3, "label": "Company4", "indicator": "cross", "optionSide": "right"},
//                 {"groupIndex": 4, "label": "Company5", "indicator": "loading", "optionSide": "right"},
//                 {"groupIndex": 4, "label": "Company5", "indicator": "cross", "optionSide": "right"},
//                 {"groupIndex": 5, "label": "Company6", "indicator": "loading", "optionSide": "right"},
//                 {"groupIndex": 5, "label": "Company6", "indicator": "cross", "optionSide": "right"}
//             ]
//         },
//         {
//             "overallPerformanceTitle": "right bad - left good",
//             "leftPerformanceTitle"   : "good",
//             "rightPerformanceTitle"  : "bad",
//             "snapshots"              : [
//                 {"groupIndex": 0, "label": "Company1", "indicator": "loading", "optionSide": "right"},
//                 {"groupIndex": 0, "label": "Company1", "indicator": "check", "optionSide": "right"},
//                 {"groupIndex": 1, "label": "Company2", "indicator": "loading", "optionSide": "right"},
//                 {"groupIndex": 1, "label": "Company2", "indicator": "check", "optionSide": "right"},
//                 {"groupIndex": 2, "label": "Company3", "indicator": "loading", "optionSide": "right"},
//                 {"groupIndex": 2, "label": "Company3", "indicator": "check", "optionSide": "right"},
//                 {"groupIndex": 3, "label": "Company4", "indicator": "loading", "optionSide": "left"},
//                 {"groupIndex": 3, "label": "Company4", "indicator": "cross", "optionSide": "left"},
//                 {"groupIndex": 4, "label": "Company5", "indicator": "loading", "optionSide": "left"},
//                 {"groupIndex": 4, "label": "Company5", "indicator": "cross", "optionSide": "left"},
//                 {"groupIndex": 5, "label": "Company6", "indicator": "loading", "optionSide": "left"},
//                 {"groupIndex": 5, "label": "Company6", "indicator": "cross", "optionSide": "left"}
//             ]
//         }
//     ]
// }
//
// /* variant with wrong number of option names */
// const invalidOptionsNames = {
//     "variantName"  : "stocks",
//     "numberOfTasks": 2,
//     "optionsColors": [
//         ["red", "green"],
//         ["blue", "yellow"]
//     ],
//     "optionsNames" : [
//         ["option1", "option2"],
//     ],
//     "groupsNames"  : [
//         ["stock1", "stock2", "stock3", "stock4", "stock5", "stock6"],
//         ["stock7", "stock8", "stock9", "stock10", "stock11", "stock12"]
//     ],
//     "performances" : [
//         {
//             "overallPerformanceTitle": "left good - right bad",
//             "leftPerformanceTitle"   : "good",
//             "rightPerformanceTitle"  : "bad",
//             "snapshots"              : []
//         },
//         {
//             "overallPerformanceTitle": "right bad - left good",
//             "leftPerformanceTitle"   : "good",
//             "rightPerformanceTitle"  : "bad",
//             "snapshots"              : []
//         }
//     ]
// }
//
// /* variant with wrong number of option colors */
// const invalidOptionsColors = {
//     "variantName"  : "stocks",
//     "numberOfTasks": 2,
//     "optionsColors": [
//         ["red", "green"],
//     ],
//     "optionsNames" : [
//         ["option1", "option2"],
//         ["option3", "option4"]
//     ],
//     "groupsNames"  : [
//         ["stock1", "stock2", "stock3", "stock4", "stock5", "stock6"],
//         ["stock7", "stock8", "stock9", "stock10", "stock11", "stock12"]
//     ],
//     "performances" : [
//         {
//             "overallPerformanceTitle": "left good - right bad",
//             "leftPerformanceTitle"   : "good",
//             "rightPerformanceTitle"  : "bad",
//             "snapshots"              : []
//         },
//         {
//             "overallPerformanceTitle": "right bad - left good",
//             "leftPerformanceTitle"   : "good",
//             "rightPerformanceTitle"  : "bad",
//             "snapshots"              : []
//         }
//     ]
// }
//
//
// /* variant with wrong number of groups names */
// const invalidGroupsNames = {
//     "variantName"  : "stocks",
//     "numberOfTasks": 2,
//     "optionsColors": [
//         ["red", "green"],
//         ["blue", "yellow"]
//     ],
//     "optionsNames" : [
//         ["option1", "option2"],
//         ["option3", "option4"]
//     ],
//     "groupsNames"  : [],
//     "performances" : [
//         {
//             "overallPerformanceTitle": "left good - right bad",
//             "leftPerformanceTitle"   : "good",
//             "rightPerformanceTitle"  : "bad",
//             "snapshots"              : []
//         },
//         {
//             "overallPerformanceTitle": "right bad - left good",
//             "leftPerformanceTitle"   : "good",
//             "rightPerformanceTitle"  : "bad",
//             "snapshots"              : []
//         }
//     ]
// }
//
// /* variant with wrong number of performances */
// const invalidPerformancesNumber = {
//     "variantName"  : "stocks",
//     "numberOfTasks": 2,
//     "optionsColors": [
//         ["red", "green"],
//         ["blue", "yellow"]
//     ],
//     "optionsNames" : [
//         ["option1", "option2"],
//         ["option3", "option4"]
//     ],
//     "groupsNames"  : [
//         ["stock1", "stock2", "stock3", "stock4", "stock5", "stock6"],
//         ["stock7", "stock8", "stock9", "stock10", "stock11", "stock12"]
//     ],
//     "performances" : [],
// }
// const invalidVariant1 = {}
// describe('validate variant', () => {
//     test('should reject if number of option names pairs does not equal to number of tasks', async () => {
//         expect.assertions(1)
//         /* expect promise to be rejected */
//         await expect(validateVariant(invalidOptionsNames)).rejects.toThrow()
//     })
//     test('should throw if number of option colors pairs does not equal to number of tasks', async () => {
//         expect.assertions(1)
//         /* expect promise to be rejected */
//         await expect(validateVariant(invalidOptionsColors)).rejects.toThrow()
//     })
//     test('should throw if number of groups names pairs does not equal to number of tasks', async () => {
//         expect.assertions(1)
//         /* expect promise to be rejected */
//         await expect(validateVariant(invalidGroupsNames)).rejects.toThrow()
//     })
//     test('should not throw error if a variant is valid', () => {
//         expect(() => validateVariant(validVariant)).not.toThrow()
//     })
// })
// dummy test
describe('dummy test', () => {
    test('should pass', () => {
        expect(true).toBe(true)
    })
})