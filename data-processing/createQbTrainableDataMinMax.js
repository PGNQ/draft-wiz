// Will create Train and Test data for QBs by performing a Min-Max normalization (between 0 and 1 for every feature) on the QB Dataset

const fs = require('fs');
const qbDataDrafted = JSON.parse(fs.readFileSync('../data/qb/qbDataDrafted.JSON'));
const qbAve = JSON.parse(fs.readFileSync('../data/qb/qbDraftedAverages.JSON'));

// Instantiate our Test and Train objects
var qbTrain = {
   numberOfFeatures: 7,
   features: [],
   output: []
};
var qbTest = {
   numberOfFeatures: 7,
   features: [],
   output: []
};

// Find the max and min of each feature
var maxHeight = Math.max.apply(Math, qbDataDrafted.map(function(o) { return o.heightinchestotal }));
var minHeight = Math.min.apply(Math, qbDataDrafted.map(function(o) { return o.heightinchestotal ? o.heightinchestotal : maxHeight }));
var maxWeight = Math.max.apply(Math, qbDataDrafted.map(function(o) { return o.weight }));
var minWeight = Math.min.apply(Math, qbDataDrafted.map(function(o) { return o.weight ? o.weight : maxWeight }));
var maxForty = Math.max.apply(Math, qbDataDrafted.map(function(o) { return o.fortyyd }));
var minForty = Math.min.apply(Math, qbDataDrafted.map(function(o) { return o.fortyyd ? o.fortyyd : maxForty }));
var maxTwenty = Math.max.apply(Math, qbDataDrafted.map(function(o) { return o.twentyss }));
var minTwenty = Math.min.apply(Math, qbDataDrafted.map(function(o) { return o.twentyss ? o.twentyss : maxTwenty }));
var maxThree = Math.max.apply(Math, qbDataDrafted.map(function(o) { return o.threecone }));
var minThree = Math.min.apply(Math, qbDataDrafted.map(function(o) { return o.threecone ? o.threecone : maxThree }));
var maxVertical = Math.max.apply(Math, qbDataDrafted.map(function(o) { return o.vertical }));
var minVertical = Math.min.apply(Math, qbDataDrafted.map(function(o) { return o.vertical ? o.vertical : maxVertical }));
var maxBroad = Math.max.apply(Math, qbDataDrafted.map(function(o) { return o.broad }));
var minBroad = Math.min.apply(Math, qbDataDrafted.map(function(o) { return o.broad ? o.broad : maxBroad }));

var aveHeightNormalized = (qbAve.heightinchestotalAve - minHeight)/(maxHeight - minHeight);
var aveWeightNormalized = (qbAve.weightAve - minWeight)/(maxWeight - minWeight);
var aveFortyNormalized = (qbAve.fortyydAve - minForty)/(maxForty - minForty);
var aveTwentyNormalized = (qbAve.twentyssAve - minTwenty)/(maxTwenty - minTwenty);
var aveThreeNormalized = (qbAve.threeconeAve - minThree)/(maxThree - minThree);
var aveVerticalNormalized = (qbAve.verticalAve - minVertical)/(maxVertical - minVertical);
var aveBroadNormalized = (qbAve.broadAve - minBroad)/(maxBroad - minBroad);


qbDataDrafted.forEach((el, i) => {
   // Build the training data, first rejecting data for QBs that didn't attend the combine
   if (!(el.fortyyd === 0 && el.twentyss === 0 && el.threecone === 0 && el.vertical === 0 && el.broad === 0)) {

      const normalize = (x, max, min) => {
         return (x - min)/(max - min)
      }

      // Build the training data
      if (i < qbDataDrafted.length - 10) {
         qbTrain.features.push(
            el.heightinchestotal ? normalize(el.heightinchestotal, maxHeight, minHeight) : aveHeightNormalized,   
            el.weight ? normalize(el.weight, maxWeight, minWeight) : aveWeightNormalized,
            el.fortyyd ? normalize(el.fortyyd, maxForty, minForty) : aveFortyNormalized,
            el.twentyss ? normalize(el.twentyss, maxTwenty, minTwenty) : aveTwentyNormalized,
            el.threecone ? normalize(el.threecone, maxThree, minThree) : aveThreeNormalized,
            el.vertical ? normalize(el.vertical, maxVertical, minVertical) : aveVerticalNormalized,
            el.broad ? normalize(el.broad, maxBroad, minBroad) : aveBroadNormalized
         );
         qbTrain.output.push(el.picktotal);
      } else 

      // Build the tesing data for the last 10 entries
      {
         qbTest.features.push(
            el.heightinchestotal ? normalize(el.heightinchestotal, maxHeight, minHeight) : aveHeightNormalized,   
            el.weight ? normalize(el.weight, maxWeight, minWeight) : aveWeightNormalized,
            el.fortyyd ? normalize(el.fortyyd, maxForty, minForty) : aveFortyNormalized,
            el.twentyss ? normalize(el.twentyss, maxTwenty, minTwenty) : aveTwentyNormalized,
            el.threecone ? normalize(el.threecone, maxThree, minThree) : aveThreeNormalized,
            el.vertical ? normalize(el.vertical, maxVertical, minVertical) : aveVerticalNormalized,
            el.broad ? normalize(el.broad, maxBroad, minBroad) : aveBroadNormalized
         );
         qbTest.output.push(el.picktotal);
      }
   }
})

console.log('Number of qbDataDrafted: ', qbDataDrafted.length);
console.log('Train data: ', qbTrain.features.length, qbTrain.output.length);
console.log('Test data: ', qbTest.features.length, qbTest.output.length);

fs.writeFileSync('../data/qb/qbTrainMinMax.json', JSON.stringify(qbTrain));
fs.writeFileSync('../data/qb/qbTestMinMax.json', JSON.stringify(qbTest));