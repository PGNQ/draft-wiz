const fs = require('fs');
const rbDataDrafted = JSON.parse(fs.readFileSync('../data/rb/rbDataDrafted.JSON'));
const averages = JSON.parse(fs.readFileSync('../data/rb/rbDraftedAverages.JSON'));

var rbTrain = {
   numberOfFeatures: 8,
   features: [],
   output: []
}

var rbTest = {
   numberOfFeatures: 8,
   features: [],
   output: []
}

rbDataDrafted.forEach((el, i) => {
   // Build the training data
   if (!(el.fortyyd === 0 && el.twentyss === 0 && el.threecone === 0 && el.vertical === 0 && el.broad === 0)) {
      if (i < rbDataDrafted.length - 10) {
         rbTrain.features.push(
            el.heightinchestotal ?  el.heightinchestotal - averages.heightinchestotalAve : 0,
            el.weight ? el.weight - averages.weightAve : 0,
            el.fortyyd ? el.fortyyd - averages.fortyydAve : 0,
            el.twentyss ? el.twentyss - averages.twentyssAve : 0,
            el.threecone ? el.threecone - averages.threeconeAve : 0,
            el.vertical ? el.vertical - averages.verticalAve : 0,
            el.broad ? el.broad - averages.broadAve : 0,
            el.bench ? el.bench - averages.benchAve : 0
         );
         rbTrain.output.push(el.picktotal);
      } else 
      // Build the tesing data
      {
         rbTest.features.push(
            el.heightinchestotal ?  el.heightinchestotal - averages.heightinchestotalAve : 0,
            el.weight ? el.weight - averages.weightAve : 0,
            el.fortyyd ? el.fortyyd - averages.fortyydAve : 0,
            el.twentyss ? el.twentyss - averages.twentyssAve : 0,
            el.threecone ? el.threecone - averages.threeconeAve : 0,
            el.vertical ? el.vertical - averages.verticalAve : 0,
            el.broad ? el.broad - averages.broadAve : 0,
            el.bench ? el.bench - averages.benchAve : 0
         );
         rbTest.output.push(el.picktotal);
      }
   }
})

console.log('Number of rbDataDrafted: ', rbDataDrafted.length);
console.log('Train data: ', rbTrain.features.length, rbTrain.output.length);
console.log('Test data: ', rbTest.features.length, rbTest.output.length);

fs.writeFileSync('../data/rb/rbTrain.json', JSON.stringify(rbTrain));
fs.writeFileSync('../data/rb/rbTest.json', JSON.stringify(rbTest));