const fs = require('fs');
const wrDataDrafted = JSON.parse(fs.readFileSync('../data/wr/wrDataDrafted.JSON'));
const averages = JSON.parse(fs.readFileSync('../data/wr/wrDraftedAverages.JSON'));

var wrTrain = {
   numberOfFeatures: 8,
   features: [],
   output: []
}

var wrTest = {
   numberOfFeatures: 8,
   features: [],
   output: []
}

wrDataDrafted.forEach((el, i) => {
   // Build the training data
   if (!(el.fortyyd === 0 && el.twentyss === 0 && el.threecone === 0 && el.vertical === 0 && el.broad === 0)) {
      if (i < wrDataDrafted.length - 10) {
         wrTrain.features.push(
            el.heightinchestotal ?  el.heightinchestotal - averages.heightinchestotalAve : 0,
            el.weight ? el.weight - averages.weightAve : 0,
            el.fortyyd ? el.fortyyd - averages.fortyydAve : 0,
            el.twentyss ? el.twentyss - averages.twentyssAve : 0,
            el.threecone ? el.threecone - averages.threeconeAve : 0,
            el.vertical ? el.vertical - averages.verticalAve : 0,
            el.broad ? el.broad - averages.broadAve : 0,
            el.bench ? el.bench - averages.benchAve : 0
         );
         wrTrain.output.push(el.picktotal);
      } else 
      // Build the tesing data
      {
         wrTest.features.push(
            el.heightinchestotal ?  el.heightinchestotal - averages.heightinchestotalAve : 0,
            el.weight ? el.weight - averages.weightAve : 0,
            el.fortyyd ? el.fortyyd - averages.fortyydAve : 0,
            el.twentyss ? el.twentyss - averages.twentyssAve : 0,
            el.threecone ? el.threecone - averages.threeconeAve : 0,
            el.vertical ? el.vertical - averages.verticalAve : 0,
            el.broad ? el.broad - averages.broadAve : 0,
            el.bench ? el.bench - averages.benchAve : 0
         );
         wrTest.output.push(el.picktotal);
      }
   }

})

console.log('Number of wrDataDrafted: ', wrDataDrafted.length);
console.log('Train data: ', wrTrain.features.length, wrTrain.output.length);
console.log('Test data: ', wrTest.features.length, wrTest.output.length);


fs.writeFileSync('../data/wr/wrTrain.json', JSON.stringify(wrTrain));
fs.writeFileSync('../data/wr/wrTest.json', JSON.stringify(wrTest));