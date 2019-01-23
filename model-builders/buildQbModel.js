const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const train = JSON.parse(fs.readFileSync('../data/qb/qbTrain.JSON'));
const test = JSON.parse(fs.readFileSync('../data/qb/qbTest.JSON'));

// Define a model
const model = tf.sequential();

//add hidden layer
model.add(tf.layers.dense({
  units: 10, 
  inputShape: [train.numberOfFeatures],
  activation: 'sigmoid',
  kernelInitializer: 'randomNormal'
}));

// add output layer
model.add(tf.layers.dense({
  units: 1,
  // activation: 'sigmoid'
}));

model.summary();
const learningRate = 0.002;
const sgdOpt = tf.train.sgd(learningRate);

model.compile({
  loss: 'meanSquaredError', 
  optimizer: sgdOpt
});

// Create tensors of the training data
const inputTrain = tf.tensor(train.features, [train.output.length, train.numberOfFeatures]);
// console.log('input tensors: ', inputTrain)
const outputTrain = tf.tensor(train.output, [train.output.length, 1]);
// console.log('output tensors: ', outputTrain)


(async function () {
// Train the model using the data.
  const history = await model.fit(inputTrain, outputTrain, { epochs: 5000});
  console.log(history);
  console.log('number of samples: ',train.features.length/train.numberOfFeatures);
})().then(()=> {
  console.log('training complete');
  model.predict(tf.tensor(test.features, [10, 7])).print();
  model.save('file://../tensorflow-models/qb-model');
})












