const { MongoClient } = require('mongodb');

const url = require('../../src/ConfigServer.json').MONGOURL//'mongodb://localhost:27017'
const client = new MongoClient(url);
const dbName = 'FinalProject';

connect();

async function connect() {
    try {
        await client.connect();
        console.log('Mongo Connected successfully to server');

    } catch (err) {
        console.log(err)
    }
}
// export const db = firebase.firestore();
module.exports  = {
    db:client.db(dbName),
    mongo:client


    // connect: connect,
    // getDB: () => {
    //     return db;
    // },
    // d:connect()
}
