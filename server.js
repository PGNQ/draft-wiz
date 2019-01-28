const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const port = process.env.PORT || 7000;
const fs = require('fs');
const cors = require('cors');
const path = require('path');

// Middleware functions
app.use(function( req, res, next) {
   console.log(`${new Date()} - ${req.method} request for ${req.url}`);
   next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


// Load all data/models and start the server
const qbStats = JSON.parse(fs.readFileSync('./data/qb/qbStats.JSON'));
const rbStats = JSON.parse(fs.readFileSync('./data/rb/rbStats.JSON'));
const wrStats = JSON.parse(fs.readFileSync('./data/wr/wrStats.JSON'));
var qbModel;
var rbModel;
var wrModel;

(async function () {
   console.log('Loading models');
   qbModel = await tf.loadModel('file://./tensorflow-models/qb-model/model.JSON');
   rbModel = await tf.loadModel('file://./tensorflow-models/rb-model/model.JSON');
   wrModel = await tf.loadModel('file://./tensorflow-models/wr-model/model.JSON');
   console.log('Models loaded');

   //only start the server once the models are loaded
   app.listen(port, () => {
      console.log('Node.js listening on port ' + port);
   });
})()



app.post('/api/predict/:position', (req, res) => {
   
   var position = req.params.position;
   var model = null;

   if(position === 'qb') {
      model = qbModel;
      modelStats = qbStats;
   } else 
   if (position === 'rb') {
      model = rbModel;
      modelStats = rbStats;
   } else
   if (position === 'wr') {
      model = wrModel;
      modelStats = wrStats;
   }

   // Incoming data needs to be normalized just like the training data, with a Min-Max normalization, before a meaningful prediction can be made on the model
   var height = parseInt(req.body.height);
   var heightNormal = (height - modelStats.minHeight) / (modelStats.maxHeight - modelStats.minHeight);
   var weight = parseInt(req.body.weight);
   var weightNormal = (weight - modelStats.minWeight) / (modelStats.maxWeight - modelStats.minWeight);
   var forty = parseInt(req.body.forty);
   var fortyNormal = (forty - modelStats.minForty) / (modelStats.maxForty - modelStats.minForty);
   var twentyss = parseInt(req.body.twentyss);
   var twentyssNormal = (twentyss - modelStats.minTwenty) / (modelStats.maxTwenty - modelStats.minTwenty);
   var threecone = parseInt(req.body.threecone);
   var threeconeNormal = (threecone - modelStats.minThree) / (modelStats.maxThree - modelStats.minThree);
   var vertical = parseInt(req.body.vertical);
   var verticalNormal = (vertical - modelStats.minVertical) / (modelStats.maxVertical - modelStats.minVertical);
   var broad = parseInt(req.body.broad);
   var broadNormal = (broad - modelStats.minBroad) / (modelStats.maxBroad - modelStats.minBroad);
   if (position === 'rb' || position === 'wr' ) {
      var bench = parseInt(req.body.bench);
      var benchNormal = (bench - modelStats.minBench) / (modelStats.maxBench - modelStats.minBench);
   }

   const y = tf.tidy(()=> {
      var prediction;
      (async function(){

         // Use the appropriate prediction statement. QB has 7 features to predict, whereas RB and WR have the same 8. It's important to note that the order of features matter. The order must match the order used by the training data when the model was trained.
         if (position === 'qb') {
            prediction = await model.predict(tf.tensor([heightNormal, weightNormal, fortyNormal, twentyssNormal, threeconeNormal, verticalNormal, broadNormal], [1, 7])).data();
         } else {
            prediction = await model.predict(tf.tensor([heightNormal, weightNormal, fortyNormal, twentyssNormal, threeconeNormal, verticalNormal, broadNormal, benchNormal], [1, 8])).data();
         }

         console.log('Prediction from user data: ', prediction[0]);
         console.log('memory: ', tf.memory());
         res.send(
            {
               pick: prediction[0],
               round: Math.round(prediction[0]/32 + 1)
            }
         );
      })()
   });
 });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname+'/client/build/index.html'));
 });





