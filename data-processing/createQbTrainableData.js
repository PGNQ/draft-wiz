const fs = require('fs');
const qbDataDrafted = JSON.parse(fs.readFileSync('../data/qb/qbDataDrafted.JSON'));
const averages = JSON.parse(fs.readFileSync('../data/qb/qbDraftedAverages.JSON'));

var qbTrain = {
   numberOfFeatures: 7,
   features: [],
   output: []
}

var qbTest = {
   numberOfFeatures: 7,
   features: [],
   output: []
}

qbDataDrafted.forEach((el, i) => {
   // Build the training data
   if (!(el.fortyyd === 0 && el.twentyss === 0 && el.threecone === 0 && el.vertical === 0 && el.broad === 0)) {
      if (i < qbDataDrafted.length - 10) {
         qbTrain.features.push(
            el.heightinchestotal ?  el.heightinchestotal - averages.heightinchestotalAve : 0,
            el.weight ? el.weight - averages.weightAve : 0,
            el.fortyyd ? el.fortyyd - averages.fortyydAve : 0,
            el.twentyss ? el.twentyss - averages.twentyssAve : 0,
            el.threecone ? el.threecone - averages.threeconeAve : 0,
            el.vertical ? el.vertical - averages.verticalAve : 0,
            el.broad ? el.broad - averages.broadAve : 0
         );
         qbTrain.output.push(el.picktotal);
      } else 
      // Build the tesing data
      {
         qbTest.features.push(
            el.heightinchestotal ?  el.heightinchestotal - averages.heightinchestotalAve : 0,
            el.weight ? el.weight - averages.weightAve : 0,
            el.fortyyd ? el.fortyyd - averages.fortyydAve : 0,
            el.twentyss ? el.twentyss - averages.twentyssAve : 0,
            el.threecone ? el.threecone - averages.threeconeAve : 0,
            el.vertical ? el.vertical - averages.verticalAve : 0,
            el.broad ? el.broad - averages.broadAve : 0
         );
         qbTest.output.push(el.picktotal);
      }
   }
})

console.log('Number of qbDataDrafted: ', qbDataDrafted.length);
console.log('Train data: ', qbTrain.features.length, qbTrain.output.length);
console.log('Test data: ', qbTest.features.length, qbTest.output.length);

fs.writeFileSync('../data/qb/qbTrain.json', JSON.stringify(qbTrain));
fs.writeFileSync('../data/qb/qbTest.json', JSON.stringify(qbTest));