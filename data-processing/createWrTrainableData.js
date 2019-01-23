const fs = require('fs');
const collegesArray = JSON.parse(fs.readFileSync('../data/colleges.JSON'));
const wrDataDrafted = JSON.parse(fs.readFileSync('../data/wr/wrDataDrafted.JSON'));
const averages = JSON.parse(fs.readFileSync('../data/wr/wrDraftedAverages.JSON'));

var wrTrain = {
   numberOfFeatures: 9,
   features: [],
   output: []
}

var wrTest = {
   numberOfFeatures: 9,
   features: [],
   output: []
}

wrDataDrafted.forEach((el, i) => {
   let collegeNumber = collegesArray.indexOf(el.college);
   // Build the training data
   if (i < wrDataDrafted.length - 10) {
      wrTrain.features.push(
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
      wrTrain.output.push(el.picktotal);
   } else 
   // Build the tesing data
   {
      wrTest.features.push(
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
      wrTest.output.push(el.picktotal);
   }
})

console.log('Train data: ', wrTrain.features.length, wrTrain.output.length);
console.log('Test data: ', wrTest.features.length, wrTest.output.length);


fs.writeFileSync('../data/wr/wrTrain.json', JSON.stringify(wrTrain));
fs.writeFileSync('../data/wr/wrTest.json', JSON.stringify(wrTest));