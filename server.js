const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const port = process.env.PORT || 7000;
const fs = require('fs');
const cors = require('cors');
const qbAve = JSON.parse(fs.readFileSync('./data/qb/qbDraftedAverages.JSON'));


// Middleware functions
app.use(function( req, res, next) {
   console.log(`${new Date()} - ${req.method} request for ${req.url}`);
   next();
});
app.use(express.static("./static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
   // res.append('Access-Control-Allow-Headers', ['email', 'Authorization', 'x-forwarded-proto', 'host']);
   //res.append('Content-Type','application/json');
   next();
 });
app.use(cors());


// Load all models and start the server
var qbModel;
var rbModel;
var wrModel;
(async function () {
   console.log('Loading models');
   qbModel = await tf.loadModel('file://./tensorflow-models/qb-model/model.JSON');
   console.log('Models loaded');

   //only start the server once the models are loaded
   app.listen(port, () => {
      console.log('Node.js listening on port ' + port);
   });
})()


// Routes

app.post('/api/predictQB', (req, res) => {
   console.log('req.body:', req.body);

   var height = parseInt(req.body.height);
   var heightNormal = height - qbAve.heightinchestotalAve;
   var weight = parseInt(req.body.weight);
   var weightNormal = weight - qbAve.weightAve;
   var forty = parseInt(req.body.forty);
   var fortyNormal = forty - qbAve.fortyydAve;
   var twentyss = parseInt(req.body.twentyss);
   var twentyssNormal = twentyss - qbAve.twentyssAve;
   var threecone = parseInt(req.body.threecone);
   var threeconeNormal = threecone - qbAve.threeconeAve;
   var vertical = parseInt(req.body.vertical);
   var verticalNormal = vertical - qbAve.verticalAve;
   var broad = parseInt(req.body.broad);
   var broadNormal = broad - qbAve.broadAve;

   const y = tf.tidy(()=> {
      var prediction;
      (async function(){
         prediction = await qbModel.predict(tf.tensor([heightNormal, weightNormal, fortyNormal, twentyssNormal, threeconeNormal, verticalNormal, broadNormal], [1, 7])).data();
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





