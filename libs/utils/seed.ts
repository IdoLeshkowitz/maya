/* delete all collections from db */
import client from "../client"

async function deleteAllCollections() {
    try {
        await client.connect()
        client.db(process.env.DB_NAME).listCollections().toArray().then((collections) => {
            collections.forEach((collection) => {
                client.db(process.env.DB_NAME).collection(collection.name).drop()
            })
        })
    } catch (e) {
        console.error(e)
    }finally {
        await client.close()
    }

}

deleteAllCollections().then(() => {
    console.log('done')
})