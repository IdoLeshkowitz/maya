import {assertType, describe, expect, expectTypeOf, test} from "vitest";
import {variants} from "../../public/experimentConfig.json"
import {randomizeTasksFromVariant} from "../../libs/utils/randomizeTasksFromVariant";
import {TaskMeta} from "@/types/taskMeta";
/*
    taskMeta example:
    {
        variantName: "variant1",
        leftOption : {
            optionName : "option1",
            optionColor: "red",
            groupsNames: ["group1", "group2", "group3"]
        },
    rightOption: {
            optionName : "option2",
            optionColor: "blue",
            groupsNames: ["group4", "group5", "group6"]
        },
        performance: {
       overallPerformanceTitle: "Overall performance",
       leftOption:{
       optionPerformanceTitle: "Option performance",
        snapshots: [
            {indicator: "check", groupIndex: 0, label: "group1"},
            {indicator: "cross", groupIndex: 1, label: "group2"},
            {indicator: "loading", groupIndex: 2, label: "group3"}
        ]
    },
    rightOption:{
        optionPerformanceTitle: "Option performance",
        snapshots: [
            {indicator: "check", groupIndex: 0, label: "group4"},
            {indicator: "cross", groupIndex: 1, label: "group5"},
            {indicator: "loading", groupIndex: 2, label: "group6"}
        ]
    }
    }
    }
 */
describe("randomizeTasksFromVariant", () => {
    const variant = variants[0]
    test("should return an array of tasksMeta", () => {
        const randomizedTasksMeta1 = randomizeTasksFromVariant(variant)
        /* check number of tasks */
        expect(randomizedTasksMeta1.length).toBe(variant.numberOfTasks)

        /* check taskMeta properties */
        randomizedTasksMeta1.forEach(taskMeta => {
            /* variantName */
            expect(taskMeta).toHaveProperty("variantName")
            expect(taskMeta.variantName).toBe(variant.variantName)

            expect(taskMeta).toHaveProperty("leftOption")
            expect(taskMeta.leftOption).toMatchObject({
                optionName : expect.any(String),
                optionColor: expect.any(String),
                groupsNames: expect.arrayContaining([expect.any(String)])
            })
            expect(taskMeta).toHaveProperty("rightOption")
            expect(taskMeta.rightOption).toMatchObject({
                optionName : expect.any(String),
                optionColor: expect.any(String),
                groupsNames: expect.arrayContaining([expect.any(String)])
            })
            expect(taskMeta).toHaveProperty("performance")
            expect(taskMeta.performance).toMatchObject({
                overallPerformanceTitle: expect.any(String),
                leftOption             : {
                    optionPerformanceTitle: expect.any(String),
                    snapshots             : expect.arrayContaining([expect.objectContaining({
                        indicator : expect.any(String),
                        groupIndex: expect.any(Number),
                        label     : expect.any(String)
                    })])
                },
                rightOption            : {
                    optionPerformanceTitle: expect.any(String),
                    snapshots             : expect.arrayContaining([expect.objectContaining({
                        indicator : expect.any(String),
                        groupIndex: expect.any(Number),
                        label     : expect.any(String)
                    })])
                }
            })
        })
        /*  generate another array of tasksMeta and check if it's different from the first one */
        const randomizedTasksMeta2 = randomizeTasksFromVariant(variant)
        expect(randomizedTasksMeta1).not.toEqual(randomizedTasksMeta2)
    })
})