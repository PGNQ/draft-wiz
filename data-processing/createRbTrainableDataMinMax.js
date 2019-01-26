// Will create Train and Test data for RBs by performing a Min-Max normalization (between 0 and 1 for every feature) on the RB Dataset

const fs = require('fs');
const rbDataDrafted = JSON.parse(fs.readFileSync('../data/rb/rbDataDrafted.JSON'));
const rbAve = JSON.parse(fs.readFileSync('../data/rb/rbDraftedAverages.JSON'));

// Instantiate our Test and Train objects
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


// Find the max and min of each feature
var maxHeight = Math.max.apply(Math, rbDataDrafted.map(function(o) { return o.heightinchestotal }));
var minHeight = Math.min.apply(Math, rbDataDrafted.map(function(o) { return o.heightinchestotal ? o.heightinchestotal : maxHeight }));
var maxWeight = Math.max.apply(Math, rbDataDrafted.map(function(o) { return o.weight }));
var minWeight = Math.min.apply(Math, rbDataDrafted.map(function(o) { return o.weight ? o.weight : maxWeight }));
var maxForty = Math.max.apply(Math, rbDataDrafted.map(function(o) { return o.fortyyd }));
var minForty = Math.min.apply(Math, rbDataDrafted.map(function(o) { return o.fortyyd ? o.fortyyd : maxForty }));
var maxTwenty = Math.max.apply(Math, rbDataDrafted.map(function(o) { return o.twentyss }));
var minTwenty = Math.min.apply(Math, rbDataDrafted.map(function(o) { return o.twentyss ? o.twentyss : maxTwenty }));
var maxThree = Math.max.apply(Math, rbDataDrafted.map(function(o) { return o.threecone }));
var minThree = Math.min.apply(Math, rbDataDrafted.map(function(o) { return o.threecone ? o.threecone : maxThree }));
var maxVertical = Math.max.apply(Math, rbDataDrafted.map(function(o) { return o.vertical }));
var minVertical = Math.min.apply(Math, rbDataDrafted.map(function(o) { return o.vertical ? o.vertical : maxVertical }));
var maxBroad = Math.max.apply(Math, rbDataDrafted.map(function(o) { return o.broad }));
var minBroad = Math.min.apply(Math, rbDataDrafted.map(function(o) { return o.broad ? o.broad : maxBroad }));
var maxBench = Math.max.apply(Math, rbDataDrafted.map(function(o) { return o.bench }));
var minBench = Math.min.apply(Math, rbDataDrafted.map(function(o) { return o.bench ? o.bench : maxBench }));

// Also need to normalize the average values of each feature. If an player does not have a given feature in the data, the normalized average value will be imputed. If a player does not have any combine data, that player will not be used to train the model.
var aveHeightNormalized = (rbAve.heightinchestotalAve - minHeight)/(maxHeight - minHeight);
var aveWeightNormalized = (rbAve.weightAve - minWeight)/(maxWeight - minWeight);
var aveFortyNormalized = (rbAve.fortyydAve - minForty)/(maxForty - minForty);
var aveTwentyNormalized = (rbAve.twentyssAve - minTwenty)/(maxTwenty - minTwenty);
var aveThreeNormalized = (rbAve.threeconeAve - minThree)/(maxThree - minThree);
var aveVerticalNormalized = (rbAve.verticalAve - minVertical)/(maxVertical - minVertical);
var aveBroadNormalized = (rbAve.broadAve - minBroad)/(maxBroad - minBroad);
var aveBenchNormalized = (rbAve.benchAve - minBench)/(maxBench - minBench);

// Create a file called qbStats to hold average, min, and max for each feature
var rbStats = {...rbAve, maxHeight, minHeight, maxWeight, minWeight, maxForty, minForty, maxTwenty, minTwenty, maxThree, minThree, maxVertical, minVertical, maxBroad, minBroad, maxBench, minBench };
fs.writeFileSync('../data/rb/rbStats.json', JSON.stringify(rbStats));

rbDataDrafted.forEach((el, i) => {
   // Build the training data, first rejecting data for RBs that didn't attend the combine
   if (!(el.fortyyd === 0 && el.twentyss === 0 && el.threecone === 0 && el.vertical === 0 && el.broad === 0)) {

      const normalize = (x, max, min) => {
         return (x - min)/(max - min)
      }

      // Build the training data
      if (i < rbDataDrafted.length - 10) {
         rbTrain.features.push(
            el.heightinchestotal ? normalize(el.heightinchestotal, maxHeight, minHeight) : aveHeightNormalized,   
            el.weight ? normalize(el.weight, maxWeight, minWeight) : aveWeightNormalized,
            el.fortyyd ? normalize(el.fortyyd, maxForty, minForty) : aveFortyNormalized,
            el.twentyss ? normalize(el.twentyss, maxTwenty, minTwenty) : aveTwentyNormalized,
            el.threecone ? normalize(el.threecone, maxThree, minThree) : aveThreeNormalized,
            el.vertical ? normalize(el.vertical, maxVertical, minVertical) : aveVerticalNormalized,
            el.broad ? normalize(el.broad, maxBroad, minBroad) : aveBroadNormalized,
            el.bench ? normalize(el.bench, maxBench, minBench) : aveBenchNormalized
         );
         rbTrain.output.push(el.picktotal);
      } else 

      // Build the tesing data
      {
         rbTest.features.push(
            el.heightinchestotal ? normalize(el.heightinchestotal, maxHeight, minHeight) : aveHeightNormalized,   
            el.weight ? normalize(el.weight, maxWeight, minWeight) : aveWeightNormalized,
            el.fortyyd ? normalize(el.fortyyd, maxForty, minForty) : aveFortyNormalized,
            el.twentyss ? normalize(el.twentyss, maxTwenty, minTwenty) : aveTwentyNormalized,
            el.threecone ? normalize(el.threecone, maxThree, minThree) : aveThreeNormalized,
            el.vertical ? normalize(el.vertical, maxVertical, minVertical) : aveVerticalNormalized,
            el.broad ? normalize(el.broad, maxBroad, minBroad) : aveBroadNormalized,
            el.bench ? normalize(el.bench, maxBench, minBench) : aveBenchNormalized
         );
         rbTest.output.push(el.picktotal);
      }
   }
})

console.log('Number of rbDataDrafted: ', rbDataDrafted.length);
console.log('Train data: ', rbTrain.features.length, rbTrain.output.length);
console.log('Test data: ', rbTest.features.length, rbTest.output.length);

fs.writeFileSync('../data/rb/rbTrainMinMax.json', JSON.stringify(rbTrain));
fs.writeFileSync('../data/rb/rbTestMinMax.json', JSON.stringify(rbTest));