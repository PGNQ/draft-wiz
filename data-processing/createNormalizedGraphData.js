const fs = require('fs');
const qbTrain = JSON.parse(fs.readFileSync('../data/qb/qbTrainMinMax.JSON'));
const rbTrain = JSON.parse(fs.readFileSync('../data/rb/rbTrainMinMax.JSON'));
const wrTrain = JSON.parse(fs.readFileSync('../data/wr/wrTrainMinMax.JSON'));

let qbStatsNormalized = [];
let rbStatsNormalized = [];
let wrStatsNormalized = [];

qbStatsNormalized = qbTrain.features.map((item, index) => {
   return { x: index % 7, y: item}
});
rbStatsNormalized = rbTrain.features.map((item, index) => {
   return { x: index % 8, y: item}
});
wrStatsNormalized = wrTrain.features.map((item, index) => {
   return { x: index % 8, y: item}
});


fs.writeFileSync('../client/src/data/Stats/qbStatsNormalized.json', JSON.stringify(qbStatsNormalized));
fs.writeFileSync('../client/src/data/Stats/rbStatsNormalized.json', JSON.stringify(rbStatsNormalized));
fs.writeFileSync('../client/src/data/Stats/wrStatsNormalized.json', JSON.stringify(wrStatsNormalized));