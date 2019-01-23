const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const qbAve = JSON.parse(fs.readFileSync('./data/qb/qbDraftedAverages.JSON'));

var qbModel;
var wrModel;
var rbModel;

(async function () {
   console.log('Loading models');
   qbModel = await tf.loadModel('file://./tensorflow-models/qb-model/model.JSON');
   console.log('Models loaded');
})().then(()=>{
   const y = tf.tidy(()=> {

      var height = 74;
      var heightNormal = height - qbAve.heightinchestotalAve;
   
      var weight = 190;
      var weightNormal = weight - qbAve.weightAve;
   
      var forty = 4.7;
      var fortyNormal = forty - qbAve.fortyydAve;
   
      var twentyss = 4.2;
      var twentyssNormal = twentyss - qbAve.twentyssAve;
   
      var threecone = 7;
      var threeconeNormal = threecone - qbAve.threeconeAve;
   
      var vertical = 39;
      var verticalNormal = vertical - qbAve.verticalAve;
   
      var broad = 120;
      var broadNormal = broad - qbAve.broadAve;
   
      (async function(){
         prediction = await qbModel.predict(tf.tensor([heightNormal, weightNormal, fortyNormal, twentyssNormal, threeconeNormal, verticalNormal, broadNormal], [1, 7])).data();
         console.log('Prediction from user data: ', prediction[0], '\n','Round pick prediciton: ', Math.round(prediction[0]/32 + 1));
        
         // res.send(
         //    {
         //       prediction: prediction[0]
         //    }
         // );
      })()
   });
})

