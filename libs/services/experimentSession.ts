import {Prisma} from "@prisma/client";
import {prisma} from "@client";

export const findUniqueExperimentSession = async (experimentSessionWhere: Prisma.ExperimentSessionWhereUniqueInput) => {
    try {
        return await prisma.experimentSession.findUnique({
            where: experimentSessionWhere
        })
    } catch (e) {
        console.log(e)
        return Promise.reject(e)
    }
}