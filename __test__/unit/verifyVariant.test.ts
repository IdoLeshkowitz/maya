import {Variant} from "@/types/variant";
import {describe, test, expect} from "vitest";
import {validateVariant} from "../../libs/utils/validateVariants";

const validVariant: Variant = {
    "variantName"  : "stocks",
    "numberOfTasks": 2,
    "optionsColors": [
        ["red", "green"],
        ["blue", "yellow"]
    ],
    "optionsNames" : [
        ["option1", "option2"],
        ["option3", "option4"]
    ],
    "groupsNames"  : [
        ["stock1", "stock2", "stock3", "stock4", "stock5", "stock6"],
        ["stock7", "stock8", "stock9", "stock10", "stock11", "stock12"]
    ],
    "performances" : [
        {
            "overallPerformanceTitle": "right good - left bad",
            "leftOption"             : {
                "optionPerformanceTitle": "bad",
                "snapshots"             : [
                    {"groupIndex": 0, "label": "company1", "indicator": "cross"},
                    {"groupIndex": 1, "label": "company2", "indicator": "cross"},
                    {"groupIndex": 2, "label": "company3", "indicator": "cross"}
                ]
            },
            "rightOption"            : {
                "optionPerformanceTitle": "good",
                "snapshots"             : [
                    {"groupIndex": 0, "label": "company1", "indicator": "check"},
                    {"groupIndex": 1, "label": "company2", "indicator": "check"},
                    {"groupIndex": 2, "label": "company3", "indicator": "check"}
                ]
            }
        },
        {
            "overallPerformanceTitle": "right bad - left good",
            "leftOption"             : {
                "optionPerformanceTitle": "good",
                "snapshots"             : [
                    {"groupIndex": 0, "label": "company1", "indicator": "check"},
                    {"groupIndex": 1, "label": "company2", "indicator": "check"},
                    {"groupIndex": 2, "label": "company3", "indicator": "check"}
                ]
            },
            "rightOption"            : {
                "optionPerformanceTitle": "bad",
                "snapshots"             : [
                    {"groupIndex": 0, "label": "company1", "indicator": "cross"},
                    {"groupIndex": 1, "label": "company2", "indicator": "cross"},
                    {"groupIndex": 2, "label": "company3", "indicator": "cross"}
                ]
            }
        }
    ]
}
/* variant with missing variantName */
const invalidVariant1 = {
    "numberOfTasks": 2,
    "optionsColors": [
        ["red", "green"],
        ["blue", "yellow"]
    ],
    "optionsNames" : [
        ["option1", "option2"],
        ["option3", "option4"]
    ],
    "groupsNames"  : [
        ["stock1", "stock2", "stock3", "stock4", "stock5", "stock6"],
        ["stock7", "stock8", "stock9", "stock10", "stock11", "stock12"]
    ],
    "performances" : [
        {
            "overallPerformanceTitle": "right good - left bad",
            "leftOption"             : {
                "optionPerformanceTitle": "bad",
                "snapshots"             : [
                    {"groupIndex": 0, "label": "company1", "indicator": "cross"},
                    {"groupIndex": 1, "label": "company2", "indicator": "cross"},
                    {"groupIndex": 2, "label": "company3", "indicator": "cross"}
                ]
            },
            "rightOption"            : {
                "optionPerformanceTitle": "good",
                "snapshots"             : [
                    {"groupIndex": 0, "label": "company1", "indicator": "check"},
                    {"groupIndex": 1, "label": "company2", "indicator": "check"},
                    {"groupIndex": 2, "label": "company3", "indicator": "check"}
                ]
            },
        }
    ]
}

/* variant with wrong number of tasks */
const invalidVariant2 = {
    "variantName"  : "stocks",
    "numberOfTasks": 3,
    "optionsColors": [
        ["red", "green"],
        ["blue", "yellow"]
    ],
    "optionsNames" : [
        ["option1", "option2"],
        ["option3", "option4"]
    ],
    "groupsNames"  : [
        ["stock1", "stock2", "stock3", "stock4", "stock5", "stock6"],
        ["stock7", "stock8", "stock9", "stock10", "stock11", "stock12"]
    ],
    "performances" : [
        {
            "overallPerformanceTitle": "right good - left bad",
            "leftOption"             : {
                "optionPerformanceTitle": "bad",
                "snapshots"             : [
                    {"groupIndex": 0, "label": "company1", "indicator": "cross"},
                    {"groupIndex": 1, "label": "company2", "indicator": "cross"},
                    {"groupIndex": 2, "label": "company3", "indicator": "cross"}
                ]
            },
            "rightOption"            : {
                "optionPerformanceTitle": "good",
                "snapshots"             : [
                    {"groupIndex": 0, "label": "company1", "indicator": "check"},
                    {"groupIndex": 1, "label": "company2", "indicator": "check"},
                    {"groupIndex": 2, "label": "company3", "indicator": "check"}
                ]
            }
        }
    ]
}

/* variant with wrong number of option names */
const invalidVariant3 = {
    "variantName"  : "stocks",
    "numberOfTasks": 2,
    "optionsColors": [
        ["red", "green"],
        ["blue", "yellow"]
    ],
    "optionsNames" : [
        ["option1", "option2"],
    ],
    "groupsNames"  : [
        ["stock1", "stock2", "stock3", "stock4", "stock5", "stock6"],
        ["stock7", "stock8", "stock9", "stock10", "stock11", "stock12"]
    ],
    "performances" : [
        {
            "overallPerformanceTitle": "right good - left bad",
            "leftOption"             : {
                "optionPerformanceTitle": "bad",
                "snapshots"             : [
                    {"groupIndex": 0, "label": "company1", "indicator": "cross"},
                    {"groupIndex": 1, "label": "company2", "indicator": "cross"},
                    {"groupIndex": 2, "label": "company3", "indicator": "cross"}
                ]
            },
            "rightOption"            : {
                "optionPerformanceTitle": "good",
                "snapshots"             : [
                    {"groupIndex": 0, "label": "company1", "indicator": "check"},
                    {"groupIndex": 1, "label": "company2", "indicator": "check"},
                    {"groupIndex": 2, "label": "company3", "indicator": "check"}
                ]
            }
        }
    ]
}

describe('validate variant', () => {
    test('should throw error if a variant is invalid', () => {
        expect(() => validateVariant(invalidVariant1)).toThrow()
        expect(() => validateVariant(invalidVariant2)).toThrow()
        expect(() => validateVariant(invalidVariant3)).toThrow()
    })
    test('should not throw error if a variant is valid', () => {
        expect(() => validateVariant(validVariant)).not.toThrow()
    })
})