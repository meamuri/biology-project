const csv = require('csv-parser');
const fs = require('fs');

const headers = ['Phylum', 'PhylumName', 'Family', 'FamilyName', 'Species', 'SpeciesName'];

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

const acc = [];

async function main() {
    fs.createReadStream('../Classification.csv')
        .pipe(csv({
            headers,
            mapValues: ({ header, index, value }) => value.trim()
        }))
        .on('data', async data => {
            acc.push(data)
        })
        .on('end', async () => {
            console.log(acc);
            await processData(acc);
        });
}

async function processData(data) {
    const conn = await MongoClient.connect(url);
    const db = conn.db("flora");

    const phylumCollection = db.collection('phylum');
    const familyCollection = db.collection('family');
    const speciesCollection = db.collection('species');

    let res = data.reduce((acc, elem) => {
        acc[elem.Species] = elem;
        return acc
    }, {});
    console.log(res);
    await conn.close();
}

async function processFloraInsert(keyName, cache, collection, defaultObj, obj) {
    let name = obj[keyName];
    let ruLocaleName = obj[keyName + 'Name'];
    if (!(name in Object.keys(cache))) {
        let insert = {name, ruLocaleName};
        let insertRes = await collection.insertOne(insert);
        cache[name] = {
            id: insertRes.insertedId.id,
            name,
            ruLocaleName,
            elems: defaultObj(),
        }
    }
    return cache[name].elems;
}

(async () => {
    await main();
})();
