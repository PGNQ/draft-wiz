const fs = require('fs');
// const wrDrafted = JSON.parse(fs.readFileSync('./data/wr/wrDataDrafted.JSON'));


var heightSum = 0;
var heightCount = 0;
var weightSum = 0;
var weightCount = 0;
var fortyydSum = 0;
var fortyCount = 0;
var twentyssSum = 0;
var twentyCount = 0;
var threeconeSum = 0;
var threeconeCount = 0;
var verticalSum = 0;
var verticalCount = 0;
var broadSum = 0;
var broadCount = 0;
var benchSum = 0;
var benchCount = 0;

wrDrafted.forEach(item => {
 if (item.heightinchestotal !== 0) {
   heightSum += item.heightinchestotal;
   heightCount +=1;
}
if (item.weight !== 0) {
   weightSum += item.weight;
   weightCount +=1;
}
if (item.fortyyd !== 0) {
   fortyydSum += item.fortyyd;
   fortyCount +=1;
}
if (item.twentyss !== 0) {
   twentyssSum += item.twentyss;
   twentyCount +=1;
}
if (item.threecone !== 0) {
   threeconeSum += item.threecone;
   threeconeCount +=1;
}
if (item.vertical !== 0) {
   verticalSum += item.vertical;
   verticalCount +=1;
}
if (item.broad !== 0) {
   broadSum += item.broad;
   broadCount +=1;
}
if (item.bench !== 0) {
   benchSum += item.bench;
   benchCount += 1;
}
})

var wrDraftedAverages = {
   heightinchestotalAve: heightSum / heightCount,
   weightAve: weightSum / weightCount,
   fortyydAve: fortyydSum / fortyCount,
   twentyssAve: twentyssSum / twentyCount,
   threeconeAve: threeconeSum / threeconeCount,
   verticalAve: verticalSum / verticalCount,
   broadAve: broadSum / broadCount,
   benchAve: benchSum / benchCount
}

console.log(wrDraftedAverages);

// fs.writeFileSync('./data/wrDraftedAverages.json', JSON.stringify(wrDraftedAverages));

