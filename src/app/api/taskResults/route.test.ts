import {describe, expect, test} from "vitest";
import {TaskResult} from "@/types/taskResult";
import {ObjectId} from "bson";

describe("taskResults", async () => {
    const taskResultsToInsert: TaskResult[] = [
        {
            taskId         : new ObjectId(),
            duration       : 1,
            rightScores    : [],
            leftScores     : [],
            optionSelection: {
                selectedSide: "left",
                confidence  : 1
            }
        }
    ]
    test("POST", async () => {
        const res = await fetch("http://localhost:3000/api/taskResults", {
            method : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body   : JSON.stringify(taskResultsToInsert),
        })
        expect(res.ok).toBe(true)
    })
})
//


