const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');
const port = process.env.PORT || 7000;
const fs = require('fs');
const cors = require('cors');

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


// Load all data/models and start the server
const qbAve = JSON.parse(fs.readFileSync('./data/qb/qbDraftedAverages.JSON'));
const rbAve = JSON.parse(fs.readFileSync('./data/rb/rbDraftedAverages.JSON'));
const wrAve = JSON.parse(fs.readFileSync('./data/wr/wrDraftedAverages.JSON'));
var qbModel;
var rbModel;
var wrModel;

(async function () {
   console.log('Loading models');
   qbModel = await tf.loadModel('file://./tensorflow-models/qb-model/model.JSON');
   // rbModel = await tf.loadModel('file://./tensorflow-models/rb-model/model.JSON');
   // wrModel = await tf.loadModel('file://./tensorflow-models/wr-model/model.JSON');
   console.log('Models loaded');

   //only start the server once the models are loaded
   app.listen(port, () => {
      console.log('Node.js listening on port ' + port);
   });
})()


// Routes

app.post('/api/predict/:position', (req, res) => {
   
   console.log('req:', req);
   var position = req.params.position;
   var model = null;
   var modelAve = null;

   if(position === 'qb') {
      model = qbModel;
      modelAve = qbAve;
   } else 
   if (position === 'rb') {
      // model = rbModel;
      // modelAve = rbAve;
   } else
   if (position === 'wr') {
      // model = wrModel;
      // modelAve = wrAve;
   }

   var height = parseInt(req.body.height);
   var heightNormal = height - modelAve.heightinchestotalAve;
   var weight = parseInt(req.body.weight);
   var weightNormal = weight - modelAve.weightAve;
   var forty = parseInt(req.body.forty);
   var fortyNormal = forty - modelAve.fortyydAve;
   var twentyss = parseInt(req.body.twentyss);
   var twentyssNormal = twentyss - modelAve.twentyssAve;
   var threecone = parseInt(req.body.threecone);
   var threeconeNormal = threecone - modelAve.threeconeAve;
   var vertical = parseInt(req.body.vertical);
   var verticalNormal = vertical - modelAve.verticalAve;
   var broad = parseInt(req.body.broad);
   var broadNormal = broad - modelAve.broadAve;
   if (position === 'rb' || position === 'wr' ) {
      var bench = parseInt(req.body.bench);
      var benchNormal = bench - modelAve.benchAve;
   }

   const y = tf.tidy(()=> {
      var prediction;
      (async function(){

         // Use the appropriate prediction statement. QB has 7 features to predict, whereas RB and WR have the same 8 
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





