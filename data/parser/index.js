
const csv = require('csv-parser');
const fs = require('fs');
const results = [];

const headers = ['Phylum', 'PhylumName', 'Family', 'FamilyName', 'Species', 'SpeciesName'];

fs.createReadStream('../Classification.csv')
    .pipe(csv({
        headers,
        mapValues: ({ header, index, value }) => value.trim()
    }))
    .on('data', data => {
        results.push(data)
    })
    .on('end', () => {
        console.log(results);
    });
