const MongoClient = require('mongodb').MongoClient
require('dotenv').config();
async function resetDb() {
    const client = new MongoClient(process.env.DATABASE_URL)
    try {
        await client.connect()
        await client.db(process.env.DB_NAME).dropCollection("task")
        await client.db(process.env.DB_NAME).dropCollection("taskMeta")
        await client.db(process.env.DB_NAME).dropCollection("experimentMeta")
        await client.db(process.env.DB_NAME).dropCollection("experiment")
        console.log("Database dropped")
    }catch (e) {
        console.error(e)
    }finally {
        await client.close()
    }
}

resetDb()