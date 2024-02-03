import {Config} from "@/types/config";
import {describe, expect, it} from "vitest";
import {getRandomConfigFromConfigsList, pickRandomConfigAndShuffle, shuffleConfig} from "../utils/shuffleConfig";

const config: Config[] = [
    {
        "colors": {
            "blue": "#000080",
            "orange": "#FF7F2A",
            "brown": "#43141A",
            "red": "#E0245E",
            "yellow": "#FFD700",
            "green": "#005F2C",
            "white": "#FFFFFF",
            "black": "#000000"
        },
        "experimentName": "Econ_Grouping",
        "experimentVersion": "B",
        "variantName": "stocks",
        "numberOfTasks": 2,
        "optionsColors": [
            [
                "blue",
                "orange"
            ],
            [
                "brown",
                "green"
            ]
        ],
        "optionsNames": [
            [
                "Portfolio ABG",
                "Portfolio QYN"
            ],
            [
                "Portfolio BGH",
                "Portfolio ZQN"
            ]
        ],
        "groupsNames": [
            [
                "Banking",
                "Food",
                "Products",
                "Insurance",
                "Materials",
                "Utilities"
            ],
            [
                "Real Estate",
                "Fashion",
                "Automobiles",
                "Tourism",
                "Transportation",
                "Entertainment"
            ]
        ],
        "performance": [
            {
                "overallPreviewName": "Incongruent",
                "options": [
                    {
                        "groupName": "Group_High",
                        "simpleName": "Simple_Low",
                        "snapshots": [
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 1"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 2"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 3"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 4"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 5"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 6"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 7"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 8"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 9"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 10"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 11"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 12"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 13"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 14"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 15"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 16"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 17"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 18"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 19"
                            }
                        ]
                    },
                    {
                        "groupName": "Group_Low",
                        "simpleName": "Simple_High",
                        "snapshots": [
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 1"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 2"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 3"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 4"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 5"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 6"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 7"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 8"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 9"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 10"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 11"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 12"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 13"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 14"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 15"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 16"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 17"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 18"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 19"
                            }
                        ]
                    }
                ]
            },
            {
                "overallPreviewName": "Congruent",
                "options": [
                    {
                        "groupName": "Group_High",
                        "simpleName": "Simple_High",
                        "snapshots": [
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 1"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 2"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 3"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 4"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 5"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 6"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 7"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 8"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 9"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 10"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 11"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 12"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 13"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 14"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 15"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 16"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 17"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 18"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 19"
                            }
                        ]
                    },
                    {
                        "groupName": "Group_Low",
                        "simpleName": "Simple_Low",
                        "snapshots": [
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 1"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 2"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 3"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 4"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 5"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 6"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 7"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 8"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 9"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 10"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 11"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 12"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 13"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 14"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 15"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 16"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 17"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 18"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 19"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "colors": {
            "blue": "#000080",
            "orange": "#FF7F2A",
            "brown": "#43141A",
            "red": "#E0245E",
            "yellow": "#FFD700",
            "green": "#005F2C",
            "white": "#FFFFFF",
            "black": "#000000"
        },
        "experimentName": "Config B",
        "experimentVersion": "B",
        "variantName": "stocks",
        "numberOfTasks": 2,
        "optionsColors": [
            [
                "blue",
                "orange"
            ],
            [
                "brown",
                "green"
            ]
        ],
        "optionsNames": [
            [
                "Portfolio ABG",
                "Portfolio QYN"
            ],
            [
                "Portfolio BGH",
                "Portfolio ZQN"
            ]
        ],
        "groupsNames": [
            [
                "Banking",
                "Food",
                "Products",
                "Insurance",
                "Materials",
                "Utilities"
            ],
            [
                "Real Estate",
                "Fashion",
                "Automobiles",
                "Tourism",
                "Transportation",
                "Entertainment"
            ]
        ],
        "performance": [
            {
                "overallPreviewName": "Incongruent",
                "options": [
                    {
                        "groupName": "Group_High",
                        "simpleName": "Simple_Low",
                        "snapshots": [
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 1"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 2"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 3"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 4"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 5"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 6"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 7"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 8"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 9"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 10"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 11"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 12"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 13"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 14"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 15"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 16"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 17"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 18"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 19"
                            }
                        ]
                    },
                    {
                        "groupName": "Group_Low",
                        "simpleName": "Simple_High",
                        "snapshots": [
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 1"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 2"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 3"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 4"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 5"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 6"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 7"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 8"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 9"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 10"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 11"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 12"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 13"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 14"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 15"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 16"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 17"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 18"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 19"
                            }
                        ]
                    }
                ]
            },
            {
                "overallPreviewName": "Congruent",
                "options": [
                    {
                        "groupName": "Group_High",
                        "simpleName": "Simple_High",
                        "snapshots": [
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 1"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 2"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 3"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 4"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 5"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 6"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 7"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 8"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 9"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 10"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 11"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 12"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 13"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 14"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 15"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 16"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 17"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "check",
                                "label": "Stock 18"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 19"
                            }
                        ]
                    },
                    {
                        "groupName": "Group_Low",
                        "simpleName": "Simple_Low",
                        "snapshots": [
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 1"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 2"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 3"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 4"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 5"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 6"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 7"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 8"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 9"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 10"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 11"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 12"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 13"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 14"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 15"
                            },
                            {
                                "groupIndex": 1,
                                "indicator": "cross",
                                "label": "Stock 16"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 17"
                            },
                            {
                                "groupIndex": 2,
                                "indicator": "check",
                                "label": "Stock 18"
                            },
                            {
                                "groupIndex": 0,
                                "indicator": "cross",
                                "label": "Stock 19"
                            }
                        ]
                    }
                ]
            }
        ]
    }
]

describe('shuffleConfig', () => {
    it('should shuffle the config', () => {
        const shuffledConfig = pickRandomConfigAndShuffle(config)
        expect(shuffledConfig).not.toEqual(config)
    })
    it("shoulds shuffle the groupsNames", () => {
        let flag = false
        const randomConfig = getRandomConfigFromConfigsList(config)
        const shuffledConfigs = Array.from({length: 10}, () => shuffleConfig(randomConfig))
        for (const shuffledConfig of shuffledConfigs) {
            for (let i = 0; i < randomConfig.groupsNames.length; i++) {
                for (let j = 0; j < randomConfig.groupsNames[i].length; j++) {
                    if (shuffledConfig.groupsNames[i][j] !== randomConfig.groupsNames[i][j]) {
                        flag = true
                    }
                }
            }
        }
        expect(flag).toBe(true)
    })
    it("shoulds shuffle the optionsNames", () => {
        let flag = false
        const randomConfig = getRandomConfigFromConfigsList(config)
        const shuffledConfigs = Array.from({length: 10}, () => shuffleConfig(randomConfig))
        for (const shuffledConfig of shuffledConfigs) {
            for (let i = 0; i < randomConfig.optionsNames.length; i++) {
                for (let j = 0; j < randomConfig.optionsNames[i].length; j++) {
                    if (shuffledConfig.optionsNames[i][j] !== randomConfig.optionsNames[i][j]) {
                        flag = true
                    }
                }
            }
        }
        expect(flag).toBe(true)
    })
    it("shoulds shuffle the optionsColors", () => {
        let flag = false
        const randomConfig = getRandomConfigFromConfigsList(config)
        const shuffledConfigs = Array.from({length: 10}, () => shuffleConfig(randomConfig))
        for (const shuffledConfig of shuffledConfigs) {
            for (let i = 0; i < randomConfig.optionsColors.length; i++) {
                for (let j = 0; j < randomConfig.optionsColors[i].length; j++) {
                    if (shuffledConfig.optionsColors[i][j] !== randomConfig.optionsColors[i][j]) {
                        flag = true
                    }
                }
            }
        }
        expect(flag).toBe(true)
    })

})