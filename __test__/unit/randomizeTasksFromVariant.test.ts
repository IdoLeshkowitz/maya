import {describe, expect, test} from "vitest";
import {variants} from "../../public/experimentConfig.json"
import {randomizeTasksFromVariant} from "../../libs/utils/randomizeTasksFromVariant";
import {TaskMeta, taskMetaSchema} from "../../libs/types/taskMeta";

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

async function validateTaskMeta(taskMeta: TaskMeta) {
    return await taskMetaSchema.validate(taskMeta)
}

describe("randomizeTasksFromVariant", () => {
    const variant = variants[0]
    test("should return an array of tasksMeta", async () => {
        const tasksMeta = randomizeTasksFromVariant(variant)
        const validationPromises = tasksMeta.map(async (taskMeta) => {
            try {
                await validateTaskMeta(taskMeta)
                expect(true).toBe(true)
            } catch (e) {
                expect(e).toBeUndefined()
            }
        })
        await Promise.all(validationPromises)
    })
    test("each task meta should be unique", () => {
        const generatedTasksMeta1 = randomizeTasksFromVariant(variant)
        const generatedTasksMeta2 = randomizeTasksFromVariant(variant)
        expect(generatedTasksMeta1).not.toEqual(generatedTasksMeta2)
    })
})