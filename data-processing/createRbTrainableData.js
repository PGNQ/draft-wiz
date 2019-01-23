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
   let collegeNumber = collegesArray.indexOf(el.college);
   // Build the training data
   if (i < rbDataDrafted.length - 10) {
      rbTrain.features.push(
         collegeNumber,
         el.heightinchestotal ?  el.heightinchestotal : averages.heightinchestotalAve,
         el.weight ? el.weight : averages.weightAve,
         el.fortyyd ? el.fortyyd : averages.fortyydAve,
         el.twentyss ? el.twentyss : averages.twentyssAve,
         el.threecone ? el.threecone : averages.threeconeAve,
         el.vertical ? el.vertical : averages.verticalAve,
         el.broad ? el.broad : averages.broadAve,
         el.bench ? el.bench : averages.benchAve
      );
      rbTrain.output.push(el.picktotal);
   } else 
   // Build the tesing data
   {
      rbTest.features.push(
         collegeNumber,
         el.heightinchestotal ?  el.heightinchestotal : averages.heightinchestotalAve,
         el.weight ? el.weight : averages.weightAve,
         el.fortyyd ? el.fortyyd : averages.fortyydAve,
         el.twentyss ? el.twentyss : averages.twentyssAve,
         el.threecone ? el.threecone : averages.threeconeAve,
         el.vertical ? el.vertical : averages.verticalAve,
         el.broad ? el.broad : averages.broadAve,
         el.bench ? el.bench : averages.benchAve
      );
      rbTest.output.push(el.picktotal);
   }
})

console.log('Train data: ', rbTrain.features.length, rbTrain.output.length);
console.log('Test data: ', rbTest.features.length, rbTest.output.length);

fs.writeFileSync('../data/rb/rbTrain.json', JSON.stringify(rbTrain));
fs.writeFileSync('../data/rb/rbTest.json', JSON.stringify(rbTest));