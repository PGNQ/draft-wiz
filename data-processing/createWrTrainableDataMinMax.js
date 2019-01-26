// Will create Train and Test data for WRs by performing a Min-Max normalization (between 0 and 1 for every feature) on the WR Dataset

const fs = require('fs');
const wrDataDrafted = JSON.parse(fs.readFileSync('../data/wr/wrDataDrafted.JSON'));
const wrAve = JSON.parse(fs.readFileSync('../data/wr/wrDraftedAverages.JSON'));

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

// Find the max and min of each feature
var maxHeight = Math.max.apply(Math, wrDataDrafted.map(function(o) { return o.heightinchestotal }));
var minHeight = Math.min.apply(Math, wrDataDrafted.map(function(o) { return o.heightinchestotal ? o.heightinchestotal : maxHeight }));
var maxWeight = Math.max.apply(Math, wrDataDrafted.map(function(o) { return o.weight }));
var minWeight = Math.min.apply(Math, wrDataDrafted.map(function(o) { return o.weight ? o.weight : maxWeight }));
var maxForty = Math.max.apply(Math, wrDataDrafted.map(function(o) { return o.fortyyd }));
var minForty = Math.min.apply(Math, wrDataDrafted.map(function(o) { return o.fortyyd ? o.fortyyd : maxForty }));
var maxTwenty = Math.max.apply(Math, wrDataDrafted.map(function(o) { return o.twentyss }));
var minTwenty = Math.min.apply(Math, wrDataDrafted.map(function(o) { return o.twentyss ? o.twentyss : maxTwenty }));
var maxThree = Math.max.apply(Math, wrDataDrafted.map(function(o) { return o.threecone }));
var minThree = Math.min.apply(Math, wrDataDrafted.map(function(o) { return o.threecone ? o.threecone : maxThree }));
var maxVertical = Math.max.apply(Math, wrDataDrafted.map(function(o) { return o.vertical }));
var minVertical = Math.min.apply(Math, wrDataDrafted.map(function(o) { return o.vertical ? o.vertical : maxVertical }));
var maxBroad = Math.max.apply(Math, wrDataDrafted.map(function(o) { return o.broad }));
var minBroad = Math.min.apply(Math, wrDataDrafted.map(function(o) { return o.broad ? o.broad : maxBroad }));
var maxBench = Math.max.apply(Math, wrDataDrafted.map(function(o) { return o.bench }));
var minBench = Math.min.apply(Math, wrDataDrafted.map(function(o) { return o.bench ? o.bench : maxBench }));

// Also need to normalize the average values of each feature. If an player does not have a given feature in the data, the normalized average value will be imputed. If a player does not have any combine data, that player will not be used to train the model.
var aveHeightNormalized = (wrAve.heightinchestotalAve - minHeight)/(maxHeight - minHeight);
var aveWeightNormalized = (wrAve.weightAve - minWeight)/(maxWeight - minWeight);
var aveFortyNormalized = (wrAve.fortyydAve - minForty)/(maxForty - minForty);
var aveTwentyNormalized = (wrAve.twentyssAve - minTwenty)/(maxTwenty - minTwenty);
var aveThreeNormalized = (wrAve.threeconeAve - minThree)/(maxThree - minThree);
var aveVerticalNormalized = (wrAve.verticalAve - minVertical)/(maxVertical - minVertical);
var aveBroadNormalized = (wrAve.broadAve - minBroad)/(maxBroad - minBroad);
var aveBenchNormalized = (wrAve.benchAve - minBench)/(maxBench - minBench);

// Create a file called qbStats to hold average, min, and max for each feature
var wrStats = {...wrAve, maxHeight, minHeight, maxWeight, minWeight, maxForty, minForty, maxTwenty, minTwenty, maxThree, minThree, maxVertical, minVertical, maxBroad, minBroad, maxBench, minBench };
fs.writeFileSync('../data/wr/wrStats.json', JSON.stringify(wrStats));

wrDataDrafted.forEach((el, i) => {
   // Build the training data, first rejecting data for WRs that didn't attend the combine
   if (!(el.fortyyd === 0 && el.twentyss === 0 && el.threecone === 0 && el.vertical === 0 && el.broad === 0)) {

      const normalize = (x, max, min) => {
         return (x - min)/(max - min)
      }

      // Build the training data
      if (i < wrDataDrafted.length - 10) {
         wrTrain.features.push(
            el.heightinchestotal ? normalize(el.heightinchestotal, maxHeight, minHeight) : aveHeightNormalized,   
            el.weight ? normalize(el.weight, maxWeight, minWeight) : aveWeightNormalized,
            el.fortyyd ? normalize(el.fortyyd, maxForty, minForty) : aveFortyNormalized,
            el.twentyss ? normalize(el.twentyss, maxTwenty, minTwenty) : aveTwentyNormalized,
            el.threecone ? normalize(el.threecone, maxThree, minThree) : aveThreeNormalized,
            el.vertical ? normalize(el.vertical, maxVertical, minVertical) : aveVerticalNormalized,
            el.broad ? normalize(el.broad, maxBroad, minBroad) : aveBroadNormalized,
            el.bench ? normalize(el.bench, maxBench, minBench) : aveBenchNormalized
         );
         wrTrain.output.push(el.picktotal);
      } else 
      // Build the tesing data
      {
         wrTest.features.push(
            el.heightinchestotal ? normalize(el.heightinchestotal, maxHeight, minHeight) : aveHeightNormalized,   
            el.weight ? normalize(el.weight, maxWeight, minWeight) : aveWeightNormalized,
            el.fortyyd ? normalize(el.fortyyd, maxForty, minForty) : aveFortyNormalized,
            el.twentyss ? normalize(el.twentyss, maxTwenty, minTwenty) : aveTwentyNormalized,
            el.threecone ? normalize(el.threecone, maxThree, minThree) : aveThreeNormalized,
            el.vertical ? normalize(el.vertical, maxVertical, minVertical) : aveVerticalNormalized,
            el.broad ? normalize(el.broad, maxBroad, minBroad) : aveBroadNormalized,
            el.bench ? normalize(el.bench, maxBench, minBench) : aveBenchNormalized
         );
         wrTest.output.push(el.picktotal);
      }
   }

})

console.log('Number of wrDataDrafted: ', wrDataDrafted.length);
console.log('Train data: ', wrTrain.features.length, wrTrain.output.length);
console.log('Test data: ', wrTest.features.length, wrTest.output.length);


fs.writeFileSync('../data/wr/wrTrainMinMax.json', JSON.stringify(wrTrain));
fs.writeFileSync('../data/wr/wrTestMinMax.json', JSON.stringify(wrTest));