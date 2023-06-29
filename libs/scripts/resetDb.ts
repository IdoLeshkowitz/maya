import {prisma} from "../client";

const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

async function resetDb() {
    try {
        await prisma.task.deleteMany({})
        await prisma.snapshot.deleteMany({})
        await prisma.experimentSession.deleteMany({})
        console.log('Deleted all tasks, snapshots, and experiment sessions 🎃')
    } catch (e) {
        console.log(e)
    }
}

resetDb()