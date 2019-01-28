/*
Executing "Node buildQbModel.js" will perform the following:

1. Build, train, and save a Tensorflow model. 
2. Write the results of the model's training (loss vs epoch).

*/

const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const train = JSON.parse(fs.readFileSync('../data/qb/qbTrainMinMax.JSON'));
const test = JSON.parse(fs.readFileSync('../data/qb/qbTestMinMax.JSON'));

//Commonly adjustable parameters of a model to be trained:
const ACTIVATION = 'relu6';
const LEARNINGRATE = 0.0018;
const EPOCHS = 700;

// Define a model
const model = tf.sequential();

//add hidden layer
model.add(tf.layers.dense({
  units: 6, 
  inputShape: [train.numberOfFeatures],
  activation: ACTIVATION,
  // kernelInitializer: 'zeros'
}));

// add output layer
model.add(tf.layers.dense({
  units: 1,
}));

model.summary();
const learningRate = LEARNINGRATE;
const sgdOpt = tf.train.sgd(learningRate);

model.compile({
  loss: 'meanSquaredError', 
  optimizer: sgdOpt,
  metrics: ['mae']
});

// Create tensors of the training data
const inputTrain = tf.tensor(train.features, [train.output.length, train.numberOfFeatures]);
const outputTrain = tf.tensor(train.output, [train.output.length, 1]);


// Create tensors of the validation data
const inputTest = tf.tensor(test.features, [test.output.length, test.numberOfFeatures]); 
const outputTest = tf.tensor(test.output, [test.output.length, 1]);


(async function () {
// Train the model using the data.
  const  history  = await model.fit(inputTrain, outputTrain, 
    { 
      epochs: EPOCHS, 
      validationData: [inputTest, outputTest],
    });
  // fs.writeFileSync('../data/qb/qbHistory.json', JSON.stringify(history));
  console.log(history);
  console.log('number of samples: ',train.features.length/train.numberOfFeatures);
})().then(()=> {
  console.log('training complete');
  model.predict(tf.tensor(test.features, [10, 7])).print();
  // model.save('file://../tensorflow-models/qb-model');
})












