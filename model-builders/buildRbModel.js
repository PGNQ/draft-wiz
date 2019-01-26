const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const train = JSON.parse(fs.readFileSync('../data/rb/rbTrainMinMax.JSON'));
const test = JSON.parse(fs.readFileSync('../data/rb/rbTestMinMax.JSON'));

// Define a model
const model = tf.sequential();

//add hidden layer
model.add(tf.layers.dense({
  units: 6, 
  inputShape: [train.numberOfFeatures],
  activation: 'relu6',
  // kernelInitializer: 'randomNormal'
}));

// add output layer
model.add(tf.layers.dense({
  units: 1,
}));

model.summary();
const learningRate = 0.001;
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
  const { history } = await model.fit(inputTrain, outputTrain, { epochs: 2000});
   // fs.writeFileSync('../data/rb/rbHistory.json', JSON.stringify(history));
  console.log('number of samples: ',train.features.length/train.numberOfFeatures);
})().then(()=> {
  console.log('training complete');
  model.predict(tf.tensor(test.features, [10, 8])).print();
  // model.save('file://../tensorflow-models/rb-model');
})