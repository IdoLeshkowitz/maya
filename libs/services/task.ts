import {prisma} from "@client";
import {cache} from "react";
import {Prisma} from "@prisma/client";

const taskSelect: Prisma.TaskSelect = {
    id                      : true,
    belongsToSession        : true,
    belongsToSessionId      : true,
    leftOptionColor         : true,
    leftOptionGroupsNames   : true,
    leftOptionGroupsScores  : true,
    leftOptionLabel         : true,
    leftPreviewGroupName    : true,
    leftPreviewSimpleName   : true,
    leftSnapshots           : true,
    orderInExperiment       : true,
    overallPreviewName      : true,
    rightOptionColor        : true,
    rightOptionGroupsNames  : true,
    rightOptionGroupsScores : true,
    rightOptionLabel        : true,
    rightPreviewGroupName   : true,
    rightPreviewSimpleName  : true,
    selectedOptionConfidence: true,
    selectedOptionSide      : true,
    rightSnapshots          : true,
    currentStep             : true,
    currentApp              : true,
}
export type TaskPayload = Prisma.TaskGetPayload<{ select: typeof taskSelect }>
export const findFirstTask = cache(async (taskWhereInput: Prisma.TaskWhereInput): Promise<TaskPayload | null> => {
    try {
        const data = await prisma.task.findFirst({
            where : taskWhereInput,
            select: taskSelect
        })
        return data
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
})