
const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const headers = ['Phylum', 'PhylumName', 'Family', 'FamilyName', 'Species', 'SpeciesName'];

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

async function main() {
    const conn = await MongoClient.connect(url);
    const db = conn.db("flora");

    const phylum = db.collection('phylum');
    const family = db.collection('family');
    const species = db.collection('species');

    fs.createReadStream('../Classification.csv')
        .pipe(csv({
            headers,
            mapValues: ({ header, index, value }) => value.trim()
        }))
        .on('data', async data => {
            let res = await phylum.insertOne({
                name: data.Phylum
            });
            results.push(data)
        })
        .on('end', () => {
            console.log(results);
            console.log('woof')
        });
}

(async () => {
    await main();
})();
