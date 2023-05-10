import {MongoClient} from 'mongodb'

if (!process.env.DATABASE_URL) {
    throw new Error('Please define the DATABASE_URL environment variable inside .env.local')
}
const client = new MongoClient(process.env.DATABASE_URL)

export default client


