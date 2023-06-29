import {Prisma} from "@prisma/client";

const snapshotSelect: Prisma.SnapshotSelect = {
    id                    : true,
    label                 : true,
    groupIndex            : true,
    indicator             : true,
    appearsAsRightAtTaskId: true,
    appearsAsLeftAtTaskId : true,
}

export type SnapshotPayload = Prisma.SnapshotGetPayload<{ select: typeof snapshotSelect }>
